import { Loader2, Sparkles, FileText } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ProfessionalSummaryForm = ({data, onChange, setResumeData}) => {

  const { token } =useSelector(state => state.auth)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSummary = async () => {
    try {
      setIsGenerating(true)
      const prompt = `enhance my professional summary "${data}"`;
      const response = await api.post('/api/ai/enhance-pro-sum', {userContent: prompt}, {headers: {Authorization: `Bearer ${token}`}})
      setResumeData(prev => ({...prev, professional_summary: response.data.enhancedContent}))
    } catch (error) {
      toast.error(error?.response?.message || error.message)
    }finally{
      setIsGenerating(false)
    }
  }
  return (
    <div className='bg-white p-6 rounded-2xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 space-y-4'>
      <div className='flex items-center justify-between border-b border-gray-100 pb-4'>
        <div>
            <h3 className='flex items-center gap-2 text-xl font-bold text-gray-900'> 
                <span className="bg-purple-100 text-purple-600 p-1.5 rounded-lg"><FileText className="size-5" /></span>
                Professional Summary 
            </h3>
            <p className='text-sm text-gray-500 mt-1 ml-9'>Craft an impactful career overview</p>
        </div>
        <button disabled={isGenerating} onClick={generateSummary} className='flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all shadow-sm active:scale-95 disabled:opacity-50'>
          {isGenerating ? (<Loader2 className='size-4 animate-spin'/>) : ( <Sparkles className='size-4'/>)}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>
      
      <div className='mt-4 space-y-3'>
        <textarea value={data || ""} onChange={(e)=> onChange(e.target.value)} rows={7} className='w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all resize-none shadow-sm placeholder:text-slate-400' placeholder='Write a compelling professional summary that highlights your key strengths, career milestones, and future objectives...'/>
        
        <div className="flex bg-slate-50 border border-slate-100 p-3 rounded-xl gap-2 items-start mt-2">
            <span className="text-xl">💡</span>
            <p className='text-xs font-medium text-slate-600 leading-relaxed'>
                <strong>Tip:</strong> Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills tailored to the role you want.
            </p>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalSummaryForm
