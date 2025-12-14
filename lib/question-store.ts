// Shared question data store with localStorage persistence

export interface Question {
    id: number;
    question: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    correctAnswer: "A" | "B" | "C" | "D";
    category: string;
    difficulty: "Easy" | "Medium" | "Hard";
    explanation?: string;
}

export interface StudentAnswer {
    studentId: number;
    questionId: number;
    selectedAnswer: "A" | "B" | "C" | "D";
    isCorrect: boolean;
    answeredAt: string;
}

// Initial mock questions
const initialQuestions: Question[] = [
    {
        id: 1,
        question: "Which of the following is the primary pacemaker of the heart?",
        options: {
            A: "AV node",
            B: "SA node",
            C: "Bundle of His",
            D: "Purkinje fibers",
        },
        correctAnswer: "B",
        category: "Cardiology",
        difficulty: "Easy",
        explanation: "The SA (sinoatrial) node is the primary pacemaker of the heart, initiating electrical impulses at 60-100 bpm.",
    },
    {
        id: 2,
        question: "What is the mechanism of action of ACE inhibitors?",
        options: {
            A: "Block angiotensin II receptors",
            B: "Inhibit conversion of angiotensin I to angiotensin II",
            C: "Block aldosterone receptors",
            D: "Inhibit renin release",
        },
        correctAnswer: "B",
        category: "Pharmacology",
        difficulty: "Medium",
        explanation: "ACE inhibitors block the angiotensin-converting enzyme, preventing conversion of angiotensin I to angiotensin II.",
    },
    {
        id: 3,
        question: "Which cranial nerve is responsible for facial sensation?",
        options: {
            A: "Cranial nerve V (Trigeminal)",
            B: "Cranial nerve VII (Facial)",
            C: "Cranial nerve IX (Glossopharyngeal)",
            D: "Cranial nerve X (Vagus)",
        },
        correctAnswer: "A",
        category: "Anatomy",
        difficulty: "Easy",
        explanation: "The trigeminal nerve (CN V) provides sensory innervation to the face.",
    },
    {
        id: 4,
        question: "What is the most common cause of acute pancreatitis?",
        options: {
            A: "Alcohol abuse",
            B: "Gallstones",
            C: "Hypertriglyceridemia",
            D: "Medications",
        },
        correctAnswer: "B",
        category: "Gastroenterology",
        difficulty: "Medium",
        explanation: "Gallstones are the most common cause of acute pancreatitis, followed by alcohol abuse.",
    },
    {
        id: 5,
        question: "Which immunoglobulin crosses the placenta?",
        options: {
            A: "IgA",
            B: "IgM",
            C: "IgG",
            D: "IgE",
        },
        correctAnswer: "C",
        category: "Immunology",
        difficulty: "Easy",
        explanation: "IgG is the only immunoglobulin that can cross the placenta, providing passive immunity to the fetus.",
    },
];

// Load from localStorage or use initial data
const loadQuestions = (): Question[] => {
    if (typeof window === 'undefined') return initialQuestions;
    const stored = localStorage.getItem('doctorprep_questions');
    return stored ? JSON.parse(stored) : initialQuestions;
};

const loadAnswers = (): StudentAnswer[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('doctorprep_answers');
    return stored ? JSON.parse(stored) : [];
};

// Save to localStorage
const saveQuestions = (questions: Question[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('doctorprep_questions', JSON.stringify(questions));
    }
};

const saveAnswers = (answers: StudentAnswer[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('doctorprep_answers', JSON.stringify(answers));
    }
};

// Initialize data
let questions = loadQuestions();
let studentAnswers = loadAnswers();

// Question management functions
export const questionStore = {
    getAll: () => questions,

    getById: (id: number) => questions.find(q => q.id === id),

    getByCategory: (category: string) => questions.filter(q => q.category === category),

    getByDifficulty: (difficulty: "Easy" | "Medium" | "Hard") =>
        questions.filter(q => q.difficulty === difficulty),

    add: (question: Omit<Question, "id">) => {
        const newQuestion = {
            ...question,
            id: Math.max(...questions.map(q => q.id), 0) + 1,
        };
        questions.push(newQuestion);
        saveQuestions(questions);
        return newQuestion;
    },

    update: (id: number, updates: Partial<Question>) => {
        const index = questions.findIndex(q => q.id === id);
        if (index !== -1) {
            questions[index] = { ...questions[index], ...updates };
            saveQuestions(questions);
            return questions[index];
        }
        return null;
    },

    delete: (id: number) => {
        const index = questions.findIndex(q => q.id === id);
        if (index !== -1) {
            questions.splice(index, 1);
            saveQuestions(questions);
            return true;
        }
        return false;
    },

    // Student answer tracking
    submitAnswer: (studentId: number, questionId: number, selectedAnswer: "A" | "B" | "C" | "D") => {
        const question = questionStore.getById(questionId);
        if (!question) return null;

        const isCorrect = selectedAnswer === question.correctAnswer;
        const answer: StudentAnswer = {
            studentId,
            questionId,
            selectedAnswer,
            isCorrect,
            answeredAt: new Date().toISOString(),
        };

        studentAnswers.push(answer);
        saveAnswers(studentAnswers);
        return { isCorrect, correctAnswer: question.correctAnswer, explanation: question.explanation };
    },

    getStudentAnswers: (studentId: number) =>
        studentAnswers.filter(a => a.studentId === studentId),

    getStudentStats: (studentId: number) => {
        const answers = studentAnswers.filter(a => a.studentId === studentId);
        const correct = answers.filter(a => a.isCorrect).length;
        const total = answers.length;
        const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

        return {
            questionsAnswered: total,
            correctAnswers: correct,
            accuracy,
        };
    },

    getCategories: () => [...new Set(questions.map(q => q.category))],

    // Reload from localStorage
    reload: () => {
        questions = loadQuestions();
        studentAnswers = loadAnswers();
    },
};
