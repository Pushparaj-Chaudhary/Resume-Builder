import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ExperienceForm = ({data, onChange}) => {

    const {token} = useSelector(state => state.auth)
    const [generatingIndex, setGeneratingIndex] = useState(-1)

    const addExperience = () => {
        const newExperience = {
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false
        };
        onChange([...data, newExperience])
    }

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateExperience = (index, field, value) =>{
        const updated = [...data];
        updated[index] = {...updated[index], [field]: value}
        onChange(updated)
    }

    const generateDescription = async (index) => {
        setGeneratingIndex(index)
        const experience = data[index]
        const prompt = `enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}`

        try {
            const {data} = await api.post('/api/ai/enhance-job-desc', {userContent: prompt}, {headers: {Authorization: `Bearer ${token}`}})
            updateExperience(index, "description", data.enhancedContent)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setGeneratingIndex(-1)
        }
    }
  return (
    <div className='bg-white p-6 rounded-2xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 space-y-6'>
      <div className='flex items-center justify-between border-b border-gray-100 pb-4'>
        <div>
            <h3 className='flex items-center gap-2 text-xl font-bold text-gray-900'>
                 <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg"><Briefcase className="size-5" /></span>
                 Professional Experience 
            </h3>
            <p className='text-sm text-gray-500 mt-1 ml-9'>Highlight your career achievements</p>
        </div>
        <button onClick={addExperience} className='hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 hover:shadow-sm transition-all duration-200 border border-indigo-100'>
            <Plus className='size-4'/>
            Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className='text-center py-10 bg-slate-50/50 rounded-xl border-2 border-dashed border-slate-200'>
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                <Briefcase className='w-8 h-8 text-slate-300'/>
            </div>
            <p className="font-medium text-slate-700">No work experience added</p>
            <p className='text-sm text-slate-500 mt-1 mb-4'>Detailing your past roles helps employers understand your expertise.</p>
            <button onClick={addExperience} className='inline-flex md:hidden items-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors border border-indigo-100'>
                <Plus className='size-4'/> Add First Experience
            </button>
        </div>
      ) : (
        <div className='space-y-6'>
            {data.map((experience, index)=>(
                <div key={index} className='p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4 relative group hover:border-indigo-200'>
                    <div className='flex justify-between items-center mb-2'>
                        <h4 className='font-semibold text-slate-800 flex items-center gap-2'>
                            <span className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-md">Role {index + 1}</span>
                        </h4>
                        <button onClick={()=> removeExperience(index)} className='p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 absolute top-4 right-4'>
                            <Trash2 className='size-4'/>
                        </button>
                    </div>

                    <div className='grid md:grid-cols-2 gap-4'>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</label>
                            <input value={experience.company || ""} onChange={(e)=>updateExperience(index, "company", e.target.value)} type="text" placeholder='e.g. Google' className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm'/>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Position</label>
                            <input value={experience.position || ""} onChange={(e)=>updateExperience(index, "position", e.target.value)} type="text" placeholder='e.g. Software Engineer' className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm'/>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Start Date</label>
                            <input value={experience.start_date || ""} onChange={(e)=>updateExperience(index, "start_date", e.target.value)} type="month" className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm'/>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">End Date</label>
                            <input value={experience.end_date || ""} onChange={(e)=>updateExperience(index, "end_date", e.target.value)} type="month" disabled={experience.is_current} className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm disabled:opacity-50 disabled:bg-slate-100'/>
                        </div>
                    </div>

                    <label className='flex items-center gap-2 mt-2 w-fit cursor-pointer group/check'>
                        <div className="relative flex items-center">
                            <input type="checkbox" checked={experience.is_current || false} onChange={(e)=>{updateExperience(index, "is_current", e.target.checked  ? true : false); }} className='peer w-5 h-5 cursor-pointer appearance-none rounded-md border border-slate-300 checked:bg-indigo-600 checked:border-indigo-600 transition-all'/>
                            <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <span className='text-sm text-slate-600 font-medium group-hover/check:text-slate-800 transition-colors'>I currently work here</span>
                    </label>

                    <div className='space-y-2 pt-2'>
                        <div className='flex items-center justify-between'>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Job Description</label>
                            <button onClick={()=> generateDescription(index)} disabled={generatingIndex === index || !experience.position || !experience.company} className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all disabled:opacity-50 shadow-sm hover:shadow active:scale-95'>
                                {generatingIndex === index ? (
                                    <Loader2 className='w-3.5 h-3.5 animate-spin'/>
                                ) : (
                                    <Sparkles className='w-3.5 h-3.5'/>
                                )}
                                {generatingIndex === index ? 'Enhancing...' : 'AI Enhance'}
                            </button>
                        </div>
                        <textarea value={experience.description || ""} onChange={(e)=> updateExperience(index, "description", e.target.value)} rows={4} className='w-full text-sm px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none placeholder:text-slate-400' placeholder='Describe your key responsibilities, achievements, and impact...'/>
                    </div>
                </div>
            ))}
            
            <button onClick={addExperience} className='w-full py-3 flex items-center justify-center gap-2 text-sm font-medium bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 hover:text-slate-800 border-2 border-dashed border-slate-200 transition-all duration-200'>
                <Plus className='size-4'/>
                Add Another Experience
            </button>
        </div>
      )}
    </div>
  )
}

export default ExperienceForm
