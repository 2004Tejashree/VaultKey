import React from 'react'

const Navbar = ({ navigateTo, currentView }) => {
  const isIds = localStorage.getItem('token');

  return (
    <nav className='bg-slate-800/60 backdrop-blur-md fixed w-full z-20 top-0 start-0 border-b border-white/10'>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-16">
        <div onClick={() => navigateTo('manager')} className="logo font-bold text-white text-2xl tracking-wider cursor-pointer flex items-center gap-2 hover:scale-105 transition-transform duration-300">
          <span className='text-green-500 text-3xl'>&lt;</span>
          <span>Vault</span><span className='text-green-500'>Key</span><span className='text-green-500 text-3xl'>/&gt;</span>
        </div>
        <div className='flex gap-4 items-center'>
          {!isIds && <button onClick={() => navigateTo('login')} className='text-white font-bold hover:text-green-400 transition-colors'>Sign In</button>}
          {!isIds && <button onClick={() => navigateTo('register')} className='text-white font-bold hover:text-green-400 transition-colors'>Create Account</button>}
          {isIds && <button onClick={() => navigateTo('profile')} className='bg-green-500 hover:bg-green-600 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center font-bold shadow-lg'>
            {localStorage.getItem('username') ? localStorage.getItem('username')[0].toUpperCase() : 'U'}
          </button>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
