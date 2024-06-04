"use client";

import { useRouter ,usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';

const Share = ({}) => {
    const [name,setName] = useState("");
    const router = useRouter();
    const{setAuth}=useAuth();
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get("redirect")||'/room';
    const handleClick =()=>{
   if(name){
    setAuth(name,redirectPath);
   }
    
    
  }
    return (
      
    <div className='flex flex-col items-center justify-center'>
    <img src="/hero.jpg"  className='object-cover'/>
    <div className='flex flex-col mx-4 max-w-[300px]'>
        <h3 className='text-2xl font-bold'>Choose a name</h3>
        <p className='text-gray-500'>Every user who will join the room need to have a unique name . Names are basically used to uniquely identify different devies within the room.</p>
        <input className='px-4 my-4 py-2 border-2 border-gray-500 rounded-md' type="text" placeholder='Enter Name' onChange={(e)=>setName(e.target.value)}/>
        <button onClick={handleClick} disabled={!name} className='px-4 py-2 bg-blue-500 my-4 text-white rounded-md'>Create Name</button>
    </div>
    </div>
   
  )
}

export default Share