"use client"
import { useRouter,useSearchParams } from 'next/navigation';
import React, { useEffect ,useState} from 'react'
import useAuth from '../hooks/useAuth';
import Modal from '../components/Modal';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

const Room= () => {
const router = useRouter();
 const{name,checkAuth} =useAuth();
 const[rooms,setRooms] = useState([]);
 const [roomname,setRoomName] = useState("");
 useEffect(()=>{
  checkAuth('/share?redirect=room');
},[])
 const handleRooms =()=>{
 let newroom =uuidv4();
 console.log(newroom)
 setRooms((prevrooms)=>[...prevrooms,newroom])
}

 if(!name) return <p>Please create a name first.</p>
  return (
    <div className='my-2 mx-4'>
    <div>
      <h1 className='text-2xl font-bold'>Hi,{name}</h1>
      <p className='text-gray-500'>Please create a room and start sharing files.!</p>
    </div>
    <p className='font-bold my-4 text-4xl '>Recent Rooms</p>
    <div className='flex gap-2'>
    {rooms.length>0&&rooms.map((room,index)=>{
      return <Link  key={room} href={`/room/${room}`}>
        <div className='border-2 border-gray-500 cursor-pointer  min-w-[140px] rounded-md min-h-[140px] flex justify-between'>
        <p className='pt-4 px-2'>{room} </p>
       
        
      </div></Link>
    })}
    </div>
   
    <button onClick={handleRooms} className='btn-primary my-2 mx-2'>Create Room</button>
   
 
    </div>
  )
}

export default Room