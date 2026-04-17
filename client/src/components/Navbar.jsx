import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice'

const Navbar = () => {

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const logoutUser = () => {
    navigate('/')
    dispatch(logout())
  }
  return (
    <div className='sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)]'>
      <nav className='flex items-center justify-between max-w-7xl mx-auto px-6 py-4 text-slate-800 transition-all'>
        <Link to='/'>
          <img src="/LogoImg.png" alt="logo" className='h-11 w-auto drop-shadow-sm transition-transform duration-300' />
        </Link>
        <div className='flex items-center gap-5 text-sm'>
          <p className='max-sm:hidden font-medium text-slate-600 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100'>Hi, <span className="text-indigo-600 font-semibold">{user?.name}</span></p>
          <button onClick={logoutUser} className='bg-white text-slate-700 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 px-7 py-2 rounded-full font-medium active:scale-95 transition-all shadow-sm hover:shadow'>Logout</button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
