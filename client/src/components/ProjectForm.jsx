import { Code, Plus, Trash2 } from 'lucide-react';
import React from 'react'

const ProjectForm = ({ data, onChange}) => {

    const addProject = () => {
        const newProject = {
            name: "",
            type: "",
            description: "",
        };
        onChange([...data, newProject])
    }

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateProject = (index, field, value) =>{
        const updated = [...data];
        updated[index] = {...updated[index], [field]: value}
        onChange(updated)
    }

  return (
    <div className='bg-white p-6 rounded-2xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100 space-y-6'>
      <div className='flex items-center justify-between border-b border-gray-100 pb-4'>
        <div>
            <h3 className='flex items-center gap-2 text-xl font-bold text-gray-900'>
                 <span className="bg-orange-100 text-orange-600 p-1.5 rounded-lg"><Code className="size-5" /></span>
                 Projects 
            </h3>
            <p className='text-sm text-gray-500 mt-1 ml-9'>Showcase your specific portfolio pieces</p>
        </div>
        <button onClick={addProject} className='hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-100 hover:shadow-sm transition-all duration-200 border border-orange-100'>
            <Plus className='size-4'/>
            Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className='text-center py-10 bg-slate-50/50 rounded-xl border-2 border-dashed border-slate-200'>
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                <Code className='w-8 h-8 text-slate-300'/>
            </div>
            <p className="font-medium text-slate-700">No projects added yet</p>
            <p className='text-sm text-slate-500 mt-1 mb-4'>Adding projects demonstrates practical applications of your skills.</p>
            <button onClick={addProject} className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-100 transition-colors border border-orange-100'>
                <Plus className='size-4'/> Add First Project
            </button>
        </div>
      ) : (
        <div className='space-y-6'>
            {data.map((project, index)=>(
                <div key={index} className='p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4 relative group hover:border-orange-200'>
                    <div className='flex justify-between items-center mb-2'>
                        <h4 className='font-semibold text-slate-800 flex items-center gap-2'>
                            <span className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-md">Project {index + 1}</span>
                        </h4>
                        <button onClick={()=> removeProject(index)} className='p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 absolute top-4 right-4'>
                            <Trash2 className='size-4'/>
                        </button>
                    </div>

                    <div className='grid gap-4'>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Project Name</label>
                                <input value={project.name || ""} onChange={(e)=>updateProject(index, "name", e.target.value)} type="text" placeholder='e.g. E-Commerce Dashboard' className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-sm'/>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Project Type/Link</label>
                                <input value={project.type || ""} onChange={(e)=>updateProject(index, "type", e.target.value)} type="text" placeholder='e.g. Personal, GitHub Link' className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-sm'/>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</label>
                            <textarea rows={4} value={project.description || ""} onChange={(e)=>updateProject(index, "description", e.target.value)} placeholder='Describe your project, technologies used, and outcomes...' className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all resize-none text-sm placeholder:text-slate-400'/>
                        </div>
                    </div>
                </div>
            ))}
            
            <button onClick={addProject} className='w-full py-3 flex items-center justify-center gap-2 text-sm font-medium bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 hover:text-slate-800 border-2 border-dashed border-slate-200 transition-all duration-200'>
                <Plus className='size-4'/>
                Add Another Project
            </button>
        </div>
      )}
    </div>
  )
}

export default ProjectForm
