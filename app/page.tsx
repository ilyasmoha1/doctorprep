import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { GetStartedButton } from "@/components/get-started-button";
import { ArrowRight, Brain, Clock, ShieldCheck, Stethoscope, Users, CheckCircle } from "lucide-react";
import Link from "next/link";
import { PricingCard } from "@/components/pricing-card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1400px] pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/5 blur-3xl" />
          </div>

          <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">

            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-8 animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              The Intelligent Future of Medical Board Prep
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8 leading-tight animate-fade-in-up [animation-delay:200ms]">
              From Medical Student to <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-primary via-blue-600 to-blue-400 bg-clip-text text-transparent">
                Doctor, Faster.
              </span>
            </h1>

            <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed animate-fade-in-up [animation-delay:400ms]">
              Stop guessing what to study. Our adaptive AI creates a hyper-personalized roadmap
              that evolves with your performance, ensuring you master the USMLE steps efficiently.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up [animation-delay:600ms]">
              <GetStartedButton size="lg" className="rounded-full h-14 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all w-full sm:w-auto" showIcon>
                Start Free Trial
              </GetStartedButton>
              <Link href="#features">
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base border-primary/20 hover:bg-primary/5 w-full sm:w-auto">
                  See How It Works
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-16 pt-8 border-t border-border/40 w-full max-w-3xl animate-fade-in [animation-delay:800ms]">
              <p className="text-sm font-medium text-muted-foreground mb-6">TRUSTED BY STUDENTS FROM</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Placeholder "Logos" using text for now, meant to be images */}
                <span className="font-bold text-lg">Harvard Med</span>
                <span className="font-bold text-lg">Johns Hopkins</span>
                <span className="font-bold text-lg">UCSF</span>
                <span className="font-bold text-lg">Mayo Clinic</span>
                <span className="font-bold text-lg">Stanford</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 md:py-32 bg-secondary/30 relative">
          <div className="container px-4 md:px-6 max-w-screen-xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Engineered for <span className="text-primary">Retention</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We combine cognitive science with machine learning to ensure you're not just memorizing, but truly understanding.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Brain className="h-10 w-10 text-primary" />}
                title="Adaptive Knowledge Graph"
                description="Our AI maps your knowledge gaps in real-time and serves questions that target your weakest areas."
              />
              <FeatureCard
                icon={<Clock className="h-10 w-10 text-primary" />}
                title="Dynamic Scheduling"
                description="Miss a day? No problem. Your study plan automatically rebalances to keep you on track for exam day."
              />
              <FeatureCard
                icon={<Stethoscope className="h-10 w-10 text-primary" />}
                title="Clinical Simulations"
                description="Immerse yourself in realistic patient encounters that mirror the actual USMLE Step/Level exams."
              />
              <FeatureCard
                icon={<ShieldCheck className="h-10 w-10 text-primary" />}
                title="High-Yield Content"
                description="Curated by top scorers, our content focuses on the high-yield concepts most likely to appear."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="Peer Comparison"
                description="See how you stack up against thousands of other students anonymously to gauge your readiness."
              />
              <FeatureCard
                icon={<CheckCircle className="h-10 w-10 text-primary" />}
                title="Guarantee Pass"
                description="We are so confident in our platform that we offer a money-back guarantee if you don't pass."
              />
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section id="testimonials" className="py-24 md:py-32 bg-background">
          <div className="container px-4 md:px-6 max-w-screen-xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Success Stories</h2>
                <p className="text-muted-foreground text-lg max-w-xl">
                  Join thousands of students who achieved their dream residency using DoctorPrep.
                </p>
              </div>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-primary group">
                  View all stories <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <TestimonialCard
                quote="DoctorPrep's AI scheduler saved my life. I went from scattered studying to a 250+ on Step 1, which opened every door for me."
                author="Sarah Jenkins"
                match="Internal Medicine @ MGH"
              />
              <TestimonialCard
                quote="The clinical case simulations are incredibly realistic. Converting theory to practice became second nature before my rotations started."
                author="Michael Torres"
                match="Surgery @ Cleveland Clinic"
              />
              <TestimonialCard
                quote="I loved the performance analytics. Knowing exactly which microbiology topics to focus on was a game changer for my efficiency."
                author="Emily Rodriguez"
                match="Pediatrics @ CHOP"
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 md:py-32 bg-secondary/30">
          <div className="container px-4 md:px-6 max-w-screen-xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Simple, Transparent <span className="text-primary">Pricing</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Start for free and upgrade when you're ready to accelerate your prep. No hidden fees.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <PricingCard
                title="Free Starter"
                price="Free"
                description="Essential tools to start your USMLE journey."
                features={[
                  "Access to limited Question Bank",
                  "Basic Study Planner",
                  "Community Support",
                  "Performance Tracking (Basic)"
                ]}
                buttonText="Start for Free"
              />
              <PricingCard
                title="Pro Scholar"
                price="$29"
                popular
                description="Complete AI-powered prep suite for serious students."
                features={[
                  "Unlimited AI Question Bank",
                  "Dynamic Adaptive Planner",
                  "Deep Performance Analytics",
                  "Clinical Case Simulations",
                  "Priority AI Tutor Support"
                ]}
                buttonText="Get Pro Access"
              />
              <PricingCard
                title="Institutional"
                price="Custom"
                description="For medical schools and study groups."
                features={[
                  "All Pro features",
                  "Cohort Analytics",
                  "Admin Dashboard",
                  "Bulk User Management",
                  "Dedicated Success Manager"
                ]}
                buttonText="Contact Sales"
              />
            </div>
          </div>
        </section>

        {/* CTA Footer Section */}
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
          <div className="container px-4 md:px-6 relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to crush your boards?</h2>
            <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Join the platform that is revolutionizing medical education. Start your free trial today.
            </p>
            <div className="flex justify-center">
              <GetStartedButton size="lg" variant="secondary" className="rounded-full h-14 px-10 text-lg text-primary font-bold shadow-2xl hover:bg-white">
                Start Your Journey Now
              </GetStartedButton>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group rounded-3xl border border-border/50 bg-card p-10 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
      <div className="mb-6 rounded-2xl bg-primary/10 p-4 w-fit group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 tracking-tight">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function TestimonialCard({ quote, author, match }: { quote: string, author: string, match: string }) {
  return (
    <div className="bg-card p-10 rounded-3xl border border-border/50 shadow-sm flex flex-col h-full hover:border-primary/20 transition-colors">
      {/* Stars */}
      <div className="flex gap-1 text-yellow-400 mb-6">
        {[1, 2, 3, 4, 5].map(i => <Users key={i} className="h-4 w-4 fill-current" />)}
        {/* Using Users as star placeholder for now, ideally Star icon */}
      </div>
      <p className="text-lg text-foreground font-medium mb-6 leading-relaxed flex-1">"{quote}"</p>
      <div>
        <div className="font-bold text-lg">{author}</div>
        <div className="text-sm text-primary font-medium">{match}</div>
      </div>
    </div>
  )
}
