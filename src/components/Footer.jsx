import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800/80 backdrop-blur-md flex flex-col justify-center items-center w-full fixed bottom-0 z-10 py-2 border-t border-white/10'>
      <div className="logo font-bold text-white text-xl flex items-center gap-2">
        <span className='text-green-500 text-2xl'>&lt;</span>
        <span>Vault</span><span className='text-green-500'>Key</span><span className='text-green-500 text-2xl'>/&gt;</span>
      </div>
      <div className='flex justify-center items-center font-medium text-slate-300 text-sm mt-1'>
        Created with love by Tejashree
      </div>
    </div>
  )
}

export default Footer
