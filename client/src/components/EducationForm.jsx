import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import React from 'react'

const EducationForm = ({data, onChange}) => {

    const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa: "",
        };
        onChange([...data, newEducation])
    }

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateEducation = (index, field, value) =>{
        const updated = [...data];
        updated[index] = {...updated[index], [field]: value}
        onChange(updated)
    }

  return (
    <div className='bg-white p-6 rounded-2xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 space-y-6'>
      <div className='flex items-center justify-between border-b border-gray-100 pb-4'>
        <div>
            <h3 className='flex items-center gap-2 text-xl font-bold text-gray-900'> 
                <span className="bg-emerald-100 text-emerald-600 p-1.5 rounded-lg"><GraduationCap className="size-5" /></span>
                Education 
            </h3>
            <p className='text-sm text-gray-500 mt-1 ml-9'>Add your academic background</p>
        </div>
        <button onClick={addEducation} className='hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 hover:shadow-sm transition-all duration-200 border border-emerald-100'>
            <Plus className='size-4'/>
            Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className='text-center py-10 bg-slate-50/50 rounded-xl border-2 border-dashed border-slate-200'>
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                <GraduationCap className='w-8 h-8 text-slate-300'/>
            </div>
            <p className="font-medium text-slate-700">No education added yet</p>
            <p className='text-sm text-slate-500 mt-1 mb-4'>Include your relevant academic degrees and certifications.</p>
            <button onClick={addEducation} className='inline-flex md:hidden items-center gap-2 px-4 py-2 text-sm font-medium bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-100'>
                <Plus className='size-4'/> Add First Education
            </button>
        </div>
      ) : (
        <div className='space-y-6'>
            {data.map((education, index)=>(
                <div key={index} className='p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4 relative group hover:border-emerald-200'>
                    <div className='flex justify-between items-center mb-2'>
                        <h4 className='font-semibold text-slate-800 flex items-center gap-2'>
                            <span className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-md">School {index + 1}</span>
                        </h4>
                        <button onClick={()=> removeEducation(index)} className='p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 absolute top-4 right-4'>
                            <Trash2 className='size-4'/>
                        </button>
                    </div>

                    <div className='grid md:grid-cols-2 gap-4'>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Institution</label>
                            <input value={education.institution || ""} onChange={(e)=>updateEducation(index, "institution", e.target.value)} type="text" placeholder='e.g. Stanford University' className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm'/>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Degree</label>
                            <input value={education.degree || ""} onChange={(e)=>updateEducation(index, "degree", e.target.value)} type="text" placeholder="e.g. Bachelor of Science" className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm'/>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Field of Study</label>
                            <input value={education.field || ""} onChange={(e)=>updateEducation(index, "field", e.target.value)} type="text" placeholder="e.g. Computer Science" className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm'/>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Graduation</label>
                                <input value={education.graduation_date || ""} onChange={(e)=>updateEducation(index, "graduation_date", e.target.value)} type="month" className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm'/>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">GPA</label>
                                <input value={education.gpa || ""} onChange={(e)=>updateEducation(index, "gpa", e.target.value)} type="text" placeholder='e.g. 3.8/4.0' className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm'/>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            
            <button onClick={addEducation} className='w-full py-3 flex items-center justify-center gap-2 text-sm font-medium bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 hover:text-slate-800 border-2 border-dashed border-slate-200 transition-all duration-200'>
                <Plus className='size-4'/>
                Add Another Education
            </button>
        </div>
      )}
    </div>
  )
}

export default EducationForm
