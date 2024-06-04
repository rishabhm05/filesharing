import React, { useState } from 'react'

const Modal = ({modal,setShowModal,setRoom}) => {
  const[roomname,setRoomName] = useState("");
  const stoppropogation =(e)=>{
e.stopPropagation()
  }
  const handleRoom =()=>{
    console.log("Called")
    if(!roomname) return;
    let newroom ={
        id:Date.now(),
        roomname
    }
     setRoom((prevroom)=>[...prevroom,newroom])
     setRoomName("")
  }
  return (
    <>
    {modal&&<div onClick={()=>setShowModal(false)} className='fixed  inset-0 bg-[rgba(0,0,0,0.5)] z-10 flex items-center justify-center cursor-pointer'>
        <span className='top-2 absolute right-2 border-2 rounded-full py-1 px-1 border-[red]'>❌</span>
        <div onClick={stoppropogation } className='bg-[whitesmoke] min-w-[100px] min-h-[400px] border-4 border-[whitesmoke] rounded-md flex flex-col'>
         <h3 className='font-bold text-2xl'>Create Public Room</h3>
         <p className='text-gray-500'>Mutliple User can join the room and can share file with each others.</p>
         <input onClick={(e)=>setRoomName(e.target.value)} className='px-4 my-4 py-2 border-2 border-gray-500 rounded-md ' type="text" placeholder="Enter Room name"/>
         <button onClick={handleRoom} className='px-4 py-2 bg-blue-500 my-4 text-white rounded-md'>Create Room</button>
        </div>
    </div>
}
    </>
  )
}

export default Modal