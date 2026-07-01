// React is imported globally by Vite
import { motion } from 'framer-motion';
import { Code, Mail, Sparkles, ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function AuthPage() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('careerlift_token', token);
      navigate('/dashboard');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans flex items-center justify-center relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />

      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/10 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome to CareerLift</h2>
            <p className="text-slate-400 mt-2 text-center text-sm">
              Sign in to generate your AI-powered career report and analytics dashboard.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a href={`${API_URL}/auth/github`} className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-white text-slate-950 font-semibold hover:bg-slate-200 transition-colors shadow-sm">
              <Code className="w-5 h-5" />
              Continue with GitHub
            </a>
            <a href={`${API_URL}/auth/google`} className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors border border-white/5">
              <Mail className="w-5 h-5" />
              Continue with Google
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-slate-500">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
