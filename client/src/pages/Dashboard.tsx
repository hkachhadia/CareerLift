import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Github, Briefcase, ChevronRight, Activity, Zap, CheckCircle2 } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [githubUsername, setGithubUsername] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !targetRole) {
      setError('Please provide a resume and target role.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('githubUsername', githubUsername);
    formData.append('targetRole', targetRole);

    try {
      // Assuming the backend is running on the same domain or configured via proxy/CORS
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/analysis/generate-report`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setReportData(data.report);
      } else {
        setError(data.error || 'Failed to generate report.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const radarData = reportData ? [
    { subject: 'Overall', A: reportData.overallScore || 0, fullMark: 100 },
    { subject: 'Resume', A: reportData.resumeScore || 0, fullMark: 100 },
    { subject: 'ATS Match', A: reportData.atsCompatibilityScore || 0, fullMark: 100 },
    { subject: 'Skills', A: 85, fullMark: 100 }, // Mock dynamic value based on gaps
    { subject: 'Experience', A: 75, fullMark: 100 },
  ] : [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans p-6 md:p-12">
      <nav className="flex items-center justify-between mb-12">
        <Link to="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
           <Zap className="text-indigo-500 w-6 h-6" /> CareerLift Dashboard
        </Link>
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700"></div>
        </div>
      </nav>

      {!reportData && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-slate-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
        >
          <h2 className="text-3xl font-bold mb-2">Analyze Your Profile</h2>
          <p className="text-slate-400 mb-8">Upload your resume and provide details to generate an AI career roadmap.</p>
          
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Target Role *</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  required
                  placeholder="e.g. AI Engineer, React Developer" 
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">GitHub Username (Optional)</label>
              <div className="relative">
                <Github className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="octocat" 
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Resume (PDF) *</label>
              <div className="relative border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-indigo-500/50 transition-colors bg-slate-950/50">
                <Upload className="w-8 h-8 mx-auto text-slate-500 mb-4" />
                <p className="text-sm text-slate-400 mb-2">Drag and drop your resume here, or click to browse</p>
                <input 
                  type="file" 
                  accept=".pdf"
                  required
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {file && <p className="text-indigo-400 font-medium text-sm mt-2">Selected: {file.name}</p>}
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? <Activity className="w-5 h-5 animate-spin" /> : 'Generate AI Report'} <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        </motion.div>
      )}

      {reportData && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto space-y-8"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-slate-900/50 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
              <h3 className="text-slate-400 font-medium mb-2">Overall AI Score</h3>
              <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-cyan-400">
                {reportData.overallScore || 0}%
              </div>
              <p className="text-sm mt-4 text-slate-300">Based on {targetRole} requirements</p>
            </div>
            
            <div className="md:col-span-2 bg-slate-900/50 border border-white/10 rounded-3xl p-6 h-[300px]">
              <h3 className="text-xl font-semibold mb-4">Competency Radar</h3>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Radar name="Score" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-emerald-500/20 rounded-3xl p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2"><CheckCircle2 className="text-emerald-500" /> Key Strengths</h3>
              <ul className="space-y-3">
                {reportData.strengths?.map((s: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900/50 border border-rose-500/20 rounded-3xl p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2"><Zap className="text-rose-500" /> Missing Skills (Gap)</h3>
              <ul className="space-y-3">
                {reportData.missingSkills?.map((s: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-6">AI Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {reportData.recommendations?.map((r: string, i: number) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-slate-300 text-sm leading-relaxed">{r}</p>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      )}
    </div>
  );
}
