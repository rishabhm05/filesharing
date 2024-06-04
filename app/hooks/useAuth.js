"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const useAuth = () => {
  const router = useRouter();
  const [name, setName] = useState('');

  useEffect(() => {
    const storedName = JSON.parse(localStorage.getItem("name"));
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const checkAuth = (page) => {
    const storedName = JSON.parse(localStorage.getItem("name"));
    if (storedName) {
      setName(storedName);
    } else {
      router.push(page);
    }
  };
  const setAuth =(name,redirectPath)=>{
    localStorage.setItem("name", JSON.stringify(name));
    router.push(redirectPath);
  }

  return { name, checkAuth,setAuth };
}

export default useAuth