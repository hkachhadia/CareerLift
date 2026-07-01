import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, FileText, Github, BarChart, Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">CareerLift</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Sign In
            </button>
            <button className="text-sm font-medium bg-white text-slate-950 px-4 py-2 rounded-full hover:bg-slate-200 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                Elevate Your Career with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  AI-Powered Insights
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mb-10">
                Stop guessing. Start growing. CareerLift analyzes your Resume, GitHub, and Coding Profiles to generate a personalized roadmap to your dream role.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)]">
                  Analyze My Profile <ArrowRight className="w-5 h-5" />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-semibold transition-all">
                  View Demo Report
                </button>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mt-32"
          >
            <FeatureCard 
              icon={<FileText className="w-6 h-6 text-blue-400" />}
              title="Resume Intelligence"
              description="Extract deep insights from your resume. Get your ATS score, discover missing keywords, and receive formatting suggestions instantly."
            />
            <FeatureCard 
              icon={<Github className="w-6 h-6 text-purple-400" />}
              title="GitHub Deep Dive"
              description="We analyze your repositories, commit history, and code complexity to generate a comprehensive developer health score."
            />
            <FeatureCard 
              icon={<Code className="w-6 h-6 text-emerald-400" />}
              title="Coding Proficiency"
              description="Connect LeetCode and Codeforces. Visualize your problem-solving strengths and identify Data Structure gaps."
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}

export default App;
