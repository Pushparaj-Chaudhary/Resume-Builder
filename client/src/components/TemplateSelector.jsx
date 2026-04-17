import { Check, Layout, ChevronDown } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'

const TemplateSelector = ({ selectedTemplate, onChange }) => {

    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    const templates = [
        {
            id: "classic",
            name: "Classic",
            preview: "A clean, traditional resume format with clear sections and professional typography"
        },{
            id: "modern",
            name: "Modern",
            preview: "Sleek design with strategic use of color and modern font choices"
        },
        {
            id: "minimal-image",
            name: "Minimal Image",
            preview: "Minimal design with a single image and clean typography"
        },
        {
            id: "minimal",
            name: "Minimal",
            preview: "Ultra-clean design that puts your content front and center"
        },
        {
            id: "ats",
            name: "ATS Optimized",
            preview: "Strictly single-column, standard-font design optimized for parsing by ATS systems"
        },
    ]

    const selectedTemp = templates.find(t => t.id === selectedTemplate)

  return (
    <div className='relative z-40' ref={dropdownRef}>
      <div className="flex flex-col gap-1.5 mb-2">
         <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Theme</label>
         <button onClick={()=> setIsOpen(!isOpen)} className={`flex items-center justify-between w-full min-w-[200px] text-sm font-medium bg-gradient-to-r from-slate-800 to-slate-900 text-white hover:shadow-lg hover:shadow-slate-900/20 transition-all px-4 py-3 rounded-xl ring-2 ${isOpen ? 'ring-indigo-500/50' : 'ring-transparent'}`}>
            <span className="flex items-center gap-2">
                <Layout className="size-4 text-indigo-300"/> 
                <span>{selectedTemp ? selectedTemp.name : "Select Template"}</span>
            </span>
            <ChevronDown className={`size-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}/>
         </button>
      </div>

      {isOpen && (
        <div className='absolute top-full right-0 lg:left-0 w-80 p-2 mt-2 z-50 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] origin-top animate-in fade-in slide-in-from-top-2 duration-200'>
            <div className="max-h-[400px] overflow-y-auto space-y-1.5 p-1 no-scrollbar">
                <div className="px-3 pt-2 pb-3 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur z-10 border-b border-slate-100 mb-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase">Available Templates</span>
                    <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{templates.length}</span>
                </div>
                {templates.map((template)=>(
                    <div key={template.id} onClick={()=> {onChange(template.id); setIsOpen(false)}} className={`relative p-4 rounded-xl cursor-pointer transition-all duration-200 group border ${selectedTemplate === template.id ? "bg-indigo-50/80 border-indigo-200 ring-1 ring-indigo-500/20 shadow-sm" : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200"}`}>
                        {selectedTemplate === template.id && (
                            <div className='absolute top-4 right-4'>
                                <div className='size-5 bg-indigo-500 rounded-full flex items-center justify-center shadow-md'>
                                    <Check className='w-3 h-3 text-white'/>
                                </div>
                            </div>
                        )}

                        <div className='space-y-1.5 pr-6'>
                            <h4 className={`font-semibold ${selectedTemplate === template.id ? 'text-indigo-900' : 'text-slate-800'}`}>{template.name}</h4>
                            <div className='text-xs text-slate-500 leading-relaxed'>{template.preview}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  )
}

export default TemplateSelector
