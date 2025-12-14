// Shared student data store with localStorage persistence
// This allows both admin and auth contexts to access the same student list

export interface Student {
    id: number;
    name: string;
    email: string;
    password: string;
    plan: "Free" | "Pro" | "Institutional";
    progress: number;
    joinDate: string;
    status: "Active" | "Inactive";
}

export interface StudentProgress {
    studentId: number;
    dailyStreak: number;
    questionsAnswered: number;
    correctAnswers: number;
    accuracy: number;
    lastActiveDate: string;
    studyDays: string[];
}

// Initial mock students
const initialStudents: Student[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        password: "student123",
        plan: "Pro",
        progress: 75,
        joinDate: "2024-01-15",
        status: "Active",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        password: "student123",
        plan: "Free",
        progress: 45,
        joinDate: "2024-02-20",
        status: "Active",
    },
    {
        id: 3,
        name: "Mike Johnson",
        email: "mike@example.com",
        password: "student123",
        plan: "Institutional",
        progress: 90,
        joinDate: "2024-01-10",
        status: "Active",
    },
    {
        id: 4,
        name: "Sarah Williams",
        email: "sarah@example.com",
        password: "student123",
        plan: "Pro",
        progress: 60,
        joinDate: "2024-03-05",
        status: "Active",
    },
    {
        id: 5,
        name: "David Brown",
        email: "david@example.com",
        password: "student123",
        plan: "Free",
        progress: 30,
        joinDate: "2024-03-12",
        status: "Inactive",
    },
];

// Initial student progress data
const initialProgress: Record<number, StudentProgress> = {
    1: {
        studentId: 1,
        dailyStreak: 7,
        questionsAnswered: 145,
        correctAnswers: 120,
        accuracy: 83,
        lastActiveDate: new Date().toISOString().split("T")[0],
        studyDays: [],
    },
    2: {
        studentId: 2,
        dailyStreak: 3,
        questionsAnswered: 67,
        correctAnswers: 45,
        accuracy: 67,
        lastActiveDate: new Date().toISOString().split("T")[0],
        studyDays: [],
    },
};

// Load from localStorage or use initial data
const loadStudents = (): Student[] => {
    if (typeof window === 'undefined') return initialStudents;
    const stored = localStorage.getItem('doctorprep_students');
    return stored ? JSON.parse(stored) : initialStudents;
};

const loadProgress = (): Record<number, StudentProgress> => {
    if (typeof window === 'undefined') return initialProgress;
    const stored = localStorage.getItem('doctorprep_progress');
    return stored ? JSON.parse(stored) : initialProgress;
};

// Save to localStorage
const saveStudents = (students: Student[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('doctorprep_students', JSON.stringify(students));
    }
};

const saveProgress = (progress: Record<number, StudentProgress>) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('doctorprep_progress', JSON.stringify(progress));
    }
};

// Initialize data
let students = loadStudents();
let studentProgress = loadProgress();

// Student management functions
export const studentStore = {
    getAll: () => students,

    getById: (id: number) => students.find(s => s.id === id),

    getByEmail: (email: string) => students.find(s => s.email === email),

    add: (student: Omit<Student, "id">) => {
        const newStudent = {
            ...student,
            id: Math.max(...students.map(s => s.id), 0) + 1,
        };
        students.push(newStudent);
        saveStudents(students);
        return newStudent;
    },

    update: (id: number, updates: Partial<Student>) => {
        const index = students.findIndex(s => s.id === id);
        if (index !== -1) {
            students[index] = { ...students[index], ...updates };
            saveStudents(students);
            return students[index];
        }
        return null;
    },

    delete: (id: number) => {
        const index = students.findIndex(s => s.id === id);
        if (index !== -1) {
            students.splice(index, 1);
            saveStudents(students);
            return true;
        }
        return false;
    },

    // Progress management
    getProgress: (studentId: number) => {
        if (!studentProgress[studentId]) {
            studentProgress[studentId] = {
                studentId,
                dailyStreak: 0,
                questionsAnswered: 0,
                correctAnswers: 0,
                accuracy: 0,
                lastActiveDate: new Date().toISOString().split("T")[0],
                studyDays: [],
            };
            saveProgress(studentProgress);
        }
        return studentProgress[studentId];
    },

    updateProgress: (studentId: number, updates: Partial<StudentProgress>) => {
        const current = studentStore.getProgress(studentId);
        studentProgress[studentId] = { ...current, ...updates };
        saveProgress(studentProgress);
        return studentProgress[studentId];
    },

    // Reload from localStorage (useful after updates)
    reload: () => {
        students = loadStudents();
        studentProgress = loadProgress();
    },
};
