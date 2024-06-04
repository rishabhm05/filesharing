"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import useAuth from '../hooks/useAuth'

const Hero = () => {
    const{name} = useAuth();
     
  return (
    <div className=' my-[4rem] flex justify-center md:mx-[8rem] mx-[2rem] flex-col md:flex-row'>
    <div>
    <p className='text-4xl font-semibold'>Share File using <span className='text-blue-300'>Sockets</span></p>
     <p className='text-gray-500'>Using your WebBrowser to different devices!</p>
     <Link href={`${!name?'/share':"/room"}`}><button className='btn-primary'>Start Sharing</button></Link>
    </div>
    <div>
        <img className="object-cover" src="/hero.jpg" alt="hero" />
    </div>
    </div>
  )
}

export default Hero