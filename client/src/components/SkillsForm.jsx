import { Plus, Sparkles, X, Wrench } from 'lucide-react'
import React, { useState } from 'react'

const SkillsForm = ({data, onChange}) => {

    const [newSkill, setNewSkill] = useState("")

    const addSkill = () => {
        if(newSkill.trim() && !data.includes(newSkill.trim())){
            onChange([...data, newSkill.trim()])
            setNewSkill("")
        }
    }

    const removeSkill = (indexToRemove) => {
        onChange(data.filter((_, index)=> index !== indexToRemove))
    }

    const handleKeyPress = (e)=> {
        if(e.key === "Enter"){
            e.preventDefault();
            addSkill();
        }
    }
  return (
    <div className='bg-white p-6 rounded-2xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 space-y-6'>
      <div className='border-b border-gray-100 pb-4'>
        <h3 className='flex items-center gap-2 text-xl font-bold text-gray-900'> 
            <span className="bg-rose-100 text-rose-600 p-1.5 rounded-lg"><Wrench className="size-5" /></span>
            Skills 
        </h3>
        <p className='text-sm text-gray-500 mt-1 ml-9'>Add your technical and soft skills</p>
      </div>

      <div className='flex gap-3 relative'>
        <input type="text" placeholder='Enter a skill (e.g., JavaScript, Project Management)' className='flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all text-sm shadow-sm' onChange={(e)=>setNewSkill(e.target.value)} value={newSkill} onKeyDown={handleKeyPress}/>
        <button onClick={addSkill} disabled={!newSkill.trim()} className='flex items-center justify-center gap-1.5 px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'>
            <Plus className='size-4' /> Add
        </button>
      </div>
    
      {data.length > 0 ? (
        <div className='flex flex-wrap gap-2.5 p-4 bg-slate-50/50 rounded-xl border border-slate-100 min-h-[100px]'>
            {data.map((skill, index)=> (
                <span key={index} className='flex items-center gap-1.5 px-3 py-1.5 bg-white border border-rose-200 text-rose-700 shadow-sm rounded-lg text-sm font-medium hover:scale-105 transition-transform duration-200 group'>
                    {skill}
                    <button onClick={()=> removeSkill(index)} className='hover:bg-rose-100 text-rose-400 group-hover:text-rose-600 rounded-md p-0.5 transition-colors'>
                        <X className='w-3.5 h-3.5'/>
                    </button>
                </span>
            ))}
        </div>
      ) : (
        <div className='text-center py-8 bg-slate-50/50 rounded-xl border-2 border-dashed border-slate-200'>
            <Sparkles className='w-8 h-8 mx-auto mb-3 text-slate-300'/>
            <p className="font-medium text-slate-700">No skills added yet</p>
            <p className='text-sm text-slate-500'>Add your technical and soft skills to stand out</p>
        </div>
      )}

      <div className='bg-rose-50 border border-rose-100 p-4 rounded-xl flex gap-3'>
        <Sparkles className="size-5 text-rose-500 shrink-0"/>
        <p className='text-sm text-rose-800 leading-relaxed font-medium'>
            <strong>Pro Tip:</strong> Add 8-12 relevant skills. Include both technical skills (programming languages, tools) and soft skills (leadership, communication).
        </p>
      </div>
    </div>
  )
}

export default SkillsForm
