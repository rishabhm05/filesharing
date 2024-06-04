import React, { useState } from 'react'
import { Share2 } from 'lucide-react';

const Share = () => {
 const[message,setMessage] =useState("");
  const handleCopy =()=>{
    const url = window.location.href; // Get the current URL
    navigator.clipboard.writeText(url).then(() => {
        setMessage('Please shared  link to start sending files!');
        setTimeout(() => setMessage(''), 3000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }
  return (
    <div className='flex flex-col items-center'>
    <div onClick={handleCopy} className='cursor-pointer w-4 self-end'>
      <Share2 />
    </div>
    {message && <span className='mt-2 h-6 text-sm text-green-600'>{message}</span>}
  </div>
  )
}

export default Share