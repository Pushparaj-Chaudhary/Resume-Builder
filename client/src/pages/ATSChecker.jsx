import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeftIcon, CheckCircle, XCircle, AlertCircle, FileText, CheckCircle2, ChevronRight, BarChart } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../configs/api';
import Loader from '../components/Loader';

const ATSChecker = () => {
  const { resumeId } = useParams();
  const { token } = useSelector(state => state.auth);

  const [resumeData, setResumeData] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [showRawText, setShowRawText] = useState(false);

  useEffect(() => {
    const loadResume = async () => {
      try {
        const { data } = await api.get('/api/resumes/get/' + resumeId, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (data.resume) {
          setResumeData(data.resume);
        }
      } catch (error) {
        toast.error('Failed to load resume');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadResume();
  }, [resumeId, token]);

  const convertResumeToText = (data) => {
    let text = [];
    if (data.personal_info) {
      const { full_name, profession, email, phone, location } = data.personal_info;
      text.push(`Name: ${full_name || ''}`);
      text.push(`Profession: ${profession || ''}`);
      text.push(`Contact: ${email || ''}, ${phone || ''}, ${location || ''}`);
    }
    if (data.professional_summary) text.push(`Summary: ${data.professional_summary}`);
    if (data.experience && data.experience.length > 0) {
      text.push(`Experience:`);
      data.experience.forEach(exp => {
        text.push(`- ${exp.position} at ${exp.company} (${exp.start_date} - ${exp.end_date || 'Present'})`);
        text.push(`  Description: ${exp.description}`);
      });
    }
    if (data.education && data.education.length > 0) {
      text.push(`Education:`);
      data.education.forEach(edu => {
        text.push(`- ${edu.degree} in ${edu.field} from ${edu.institution}`);
      });
    }
    if (data.project && data.project.length > 0) {
      text.push(`Projects:`);
      data.project.forEach(proj => {
        text.push(`- ${proj.name}: ${proj.description}`);
      });
    }
    if (data.skills && data.skills.length > 0) {
      text.push(`Skills: ${data.skills.join(', ')}`);
    }
    return text.join('\n');
  };

  const checkAtsScore = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description');
      return;
    }
    if (!resumeData) {
      toast.error('Resume data is missing');
      return;
    }

    setIsEvaluating(true);
    setResult(null);

    const resumeText = convertResumeToText(resumeData);

    try {
      const { data } = await api.post(
        '/api/ai/check-ats-score',
        { resumeText, jobDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(data);
      toast.success('Evaluation complete');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to check ATS score');
      console.error(error);
    } finally {
      setIsEvaluating(false);
    }
  };

  const CircularProgress = ({ value, label, size = 'md', color = 'text-green-500' }) => {
    const radius = size === 'lg' ? 45 : 25;
    const stroke = size === 'lg' ? 8 : 4;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    const sizeClass = size === 'lg' ? 'w-32 h-32' : 'w-16 h-16';
    const textClass = size === 'lg' ? 'text-3xl' : 'text-sm';

    let strokeColor = 'text-red-500';
    if (value >= 70) strokeColor = 'text-green-500';
    else if (value >= 40) strokeColor = 'text-yellow-500';

    return (
      <div className="flex flex-col items-center justify-center">
        <div className={`relative ${sizeClass} flex items-center justify-center`}>
          <svg className="absolute w-full h-full -rotate-90">
            <circle
              className="text-gray-200"
              strokeWidth={stroke}
              stroke="currentColor"
              fill="transparent"
              r={normalizedRadius}
              cx="50%"
              cy="50%"
            />
            <circle
              className={strokeColor}
              strokeWidth={stroke}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={normalizedRadius}
              cx="50%"
              cy="50%"
            />
          </svg>
          <span className={`font-bold text-slate-700 ${textClass}`}>{value}%</span>
        </div>
        {label && <span className="mt-2 text-sm font-medium text-slate-600">{label}</span>}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-xl text-slate-500">Resume not found.</p>
          <Link to="/app" className="text-blue-500 hover:underline mt-4 inline-block">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-2">
        <Link to={`/app/builder/${resumeId}`} className="text-slate-500 hover:text-slate-800 transition-colors flex items-center">
          <ArrowLeftIcon className="size-4 mr-1" /> Back to Builder
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-linear-to-r from-slate-800 to-slate-900 p-6 sm:p-8 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
            <BarChart className="text-blue-400" />
            ATS Compatibility Checker
          </h1>
          <p className="text-slate-300 mt-2 font-light">
            Evaluate your resume against your target job description to get actionable insights and improve your chances of getting an interview.
          </p>
          <button 
            onClick={() => setShowRawText(true)}
            className="mt-4 text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-md border border-white/20 transition-colors flex items-center gap-2"
          >
            <FileText className="size-3" />
            View what the ATS sees
          </button>
        </div>

        <div className="p-6 sm:p-8 grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <FileText className="size-4 text-blue-500" />
                  Target Job Description
                </label>
             </div>
            <textarea
              className="w-full h-64 p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-shadow text-slate-700 text-sm"
              placeholder="Paste the target job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <button
              onClick={checkAtsScore}
              disabled={isEvaluating}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {isEvaluating ? (
                <>
                  <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Evaluating Resume...
                </>
              ) : (
                'Run ATS Evaluation'
              )}
            </button>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col items-center justify-center min-h-75">
             {!result && !isEvaluating && (
                <div className="text-center text-slate-500">
                  <img src="https://cdn-icons-png.flaticon.com/512/3272/3272283.png" alt="Analytics" className="w-24 h-24 mx-auto mb-4 opacity-50 grayscale" />
                  <p>Paste the job description and run the evaluation to see your ATS results here.</p>
                </div>
             )}

             {isEvaluating && (
                <div className="text-center">
                  <div className="size-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-slate-600 font-medium animate-pulse">Analyzing keywords, skills, and formatting...</p>
                </div>
             )}

             {result && (
                <div className="w-full animate-in fade-in zoom-in duration-500">
                  <h3 className="text-center font-semibold text-slate-700 mb-6 uppercase tracking-widest text-sm">Overall ATS Match</h3>
                  <div className="flex justify-center mb-8">
                    <CircularProgress value={result.ats_score} size="lg" />
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <CircularProgress value={result.keyword_match} label="Keywords" />
                    <CircularProgress value={result.skills_match} label="Skills" />
                    <CircularProgress value={result.experience_match} label="Experience" />
                    <CircularProgress value={result.education_match} label="Education" />
                  </div>
                </div>
             )}
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-8 grid lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-green-200 overflow-hidden">
               <div className="bg-green-50 px-6 py-4 border-b border-green-100 flex items-center gap-2">
                 <CheckCircle className="text-green-600 size-5" />
                 <h2 className="font-semibold text-green-800">Strengths</h2>
               </div>
               <div className="p-6">
                 <ul className="space-y-3">
                   {result.strengths?.map((strength, i) => (
                     <li key={i} className="flex gap-3 text-slate-700 text-sm">
                       <CheckCircle2 className="size-5 text-green-500 shrink-0" />
                       <p>{strength}</p>
                     </li>
                   ))}
                   {(!result.strengths || result.strengths.length === 0) && (
                     <p className="text-slate-500 text-sm">No notable strengths identified matching this job description.</p>
                   )}
                 </ul>
               </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-red-200 overflow-hidden">
               <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center gap-2">
                 <XCircle className="text-red-600 size-5" />
                 <h2 className="font-semibold text-red-800">Missing Keywords & Skills</h2>
               </div>
               <div className="p-6">
                 <div className="flex flex-wrap gap-2">
                   {result.missing_keywords?.map((keyword, i) => (
                     <span key={i} className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-md border border-red-200 flex items-center gap-1">
                       {keyword}
                     </span>
                   ))}
                   {(!result.missing_keywords || result.missing_keywords.length === 0) && (
                     <p className="text-slate-500 text-sm">You have matched all critical keywords!</p>
                   )}
                 </div>
               </div>
            </div>
          </div>

          <div className="space-y-6">
             <div className="bg-white rounded-xl shadow-sm border border-yellow-200 overflow-hidden">
               <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-100 flex items-center gap-2">
                 <AlertCircle className="text-yellow-600 size-5" />
                 <h2 className="font-semibold text-yellow-800">Actionable Suggestions</h2>
               </div>
               <div className="p-6">
                 <ul className="space-y-4">
                   {result.suggestions?.map((suggestion, i) => (
                     <li key={i} className="flex gap-3 text-slate-700 text-sm bg-yellow-50/50 p-3 rounded-lg border border-yellow-100">
                       <ChevronRight className="size-5 text-yellow-500 shrink-0 mt-0.5" />
                       <p>{suggestion}</p>
                     </li>
                   ))}
                 </ul>
               </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-blue-200 overflow-hidden">
               <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex items-center gap-2">
                 <CheckCircle className="text-blue-600 size-5" />
                 <h2 className="font-semibold text-blue-800">Matched Keywords</h2>
               </div>
               <div className="p-6">
                 <div className="flex flex-wrap gap-2">
                   {result.matched_keywords?.map((keyword, i) => (
                     <span key={i} className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-md border border-blue-200">
                       {keyword}
                     </span>
                   ))}
                 </div>
               </div>
            </div>
          </div>

        </div>
      )}

      {/* Raw Text Modal */}
      {showRawText && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden animate-in zoom-in duration-200">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <FileText className="size-4 text-blue-500" />
                Plain Text Version (ATS Parse)
              </h3>
              <button 
                onClick={() => setShowRawText(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <XCircle className="size-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
              <p className="text-xs text-slate-500 mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
                This is the raw text extracted from your resume data. ATS systems parse your resume into a similar format to identify keywords and experience.
              </p>
              <pre className="whitespace-pre-wrap font-mono text-sm text-slate-700 bg-white p-4 rounded-lg border border-slate-200 leading-relaxed">
                {convertResumeToText(resumeData)}
              </pre>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => setShowRawText(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSChecker;
