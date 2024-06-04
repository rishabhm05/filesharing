import React from 'react'

const Instruction = () => {
  return (
    <div className='md:mx-[8rem] mx-[2rem] flex gap-4 justify-between flex-col  md:flex-row'>
    <div className='max-w-[220px]'>
       <h1 className='text-3xl font-bold'>Easy To Use</h1>
       <p className=''>Open the application in your browser Create Room or join the room and share your files.</p>
    </div>    
    <div className='max-w-[220px]'>
       <h1 className='text-3xl font-bold'>Multi Sharing</h1>
       <p>You can share to mutliple users at a time.</p>
    </div>   
    <div className='max-w-[220px]'>
       <h1 className='text-3xl font-bold'>Anywhere</h1>
       <p>You can share the files across internet to different users.</p>
    </div>    
    </div>
  )
}

export default Instruction