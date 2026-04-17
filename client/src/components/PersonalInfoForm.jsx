import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({data, onChange, removeBackground, setRemoveBackground}) => {

  const handleChange = (field, value) => {
    onChange({...data, [field]: value})
  }

  const fields = [
    {key: "full_name", label: "Full Name", icon: User, type: "text", required: true},
    {key: "email", label: "Email Address", icon: Mail, type: "email", required: true},
    {key: "phone", label: "Phone Number", icon: Phone, type: "tel"},
    {key: "location", label: "Location", icon: MapPin, type: "text"},
    {key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text"},
    {key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url"},
    {key: "website", label: "Personal Website", icon: Globe, type: "url"},
  ]

  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-100">
      <div className="mb-6">
          <h3 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
            <span className="bg-indigo-100 text-indigo-600 p-1.5 rounded-lg"><User className="size-5" /></span>
            Personal Information
          </h3>
          <p className='text-sm text-gray-500 mt-1 ml-9'>Let's start with your basic details</p>
      </div>
      
      <div className='flex items-center gap-6 p-4 bg-slate-50/50 rounded-xl border border-slate-100 mb-6'>
        <label className='relative group cursor-pointer'>
          {data.image ? (
            <div className="relative">
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-white text-xs font-medium">Change</span>
                </div>
                <img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} alt='user-image' className='w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-md'/>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center w-20 h-20 bg-white border-2 border-dashed border-indigo-200 rounded-full text-indigo-500 group-hover:bg-indigo-50 group-hover:border-indigo-400 transition-all duration-300 shadow-sm'>
              <User className='size-6 mb-1'/>
              <span className="text-[10px] font-medium">Upload</span>
            </div>
          )}
          <input type="file" accept='image/jpg, image/png' className='hidden' onChange={(e)=> handleChange("image", e.target.files[0])}/>
        </label>
        
        {typeof data.image === 'object' && (
          <div className='flex flex-col gap-2 pl-4 border-l border-slate-200'>
            <p className="text-sm font-medium text-slate-700">Remove Background</p>
            <label className='relative inline-flex items-center cursor-pointer'>
              <input type="checkbox" className='sr-only peer' onChange={()=>setRemoveBackground(prev => !prev)} checked={removeBackground}/>
              <div className='w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-linear-to-r peer-checked:from-indigo-500 peer-checked:to-purple-500 shadow-inner overflow-hidden transition-all duration-300'></div>
              <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ease-in-out peer-checked:translate-x-5'></span>
            </label>
          </div>
        )}
      </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((field)=>{
        const Icon = field.icon;
        return (
            <div key={field.key} className={`space-y-1.5 ${field.key === 'full_name' || field.key === 'email' ? 'md:col-span-2' : ''}`}>
            <label className='flex items-center gap-1.5 text-sm font-medium text-slate-700'>
                <Icon className='size-4 text-slate-400'/>
                {field.label}
                {field.required && <span className='text-red-500'>*</span>}
            </label>
            <input type={field.type} value={data[field.key] || ""} onChange={(e)=>handleChange(field.key, e.target.value)} className='w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 hover:border-slate-300' placeholder={`Enter your ${field.label.toLowerCase()}`} required={field.required}/>
            </div>
        )
        })}
    </div>

    </div>
  )
}

export default PersonalInfoForm
