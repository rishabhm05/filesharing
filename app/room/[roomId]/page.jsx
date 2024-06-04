"use client"
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "@/app/hooks/useAuth";
import { usePathname, useSearchParams,useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { Share2 } from 'lucide-react';
import Share from "@/app/components/Share";
const SingleRoom = ({ params }) => {
  const { name, checkAuth } = useAuth();
  const [users, setUsers] = useState([]);
  const pathname = usePathname();
  const inputRef = useRef(null);
  const socketRef = useRef(null);
  const [files, setFiles] = useState([]);
  const[uploadedFilesMap,setUploadedFilesMap] =useState({});
  useEffect(() => {
    checkAuth(`/share?redirect=${pathname}`);
  }, [checkAuth, pathname]);

  useEffect(() => {
    if (name) {
      const socket = io("http://localhost:3009", {
        withCredentials: true
      });

      const handleJoinMsg = (data) => {
        setUsers((prevUsers) => [...new Set([...prevUsers, ...data])]);
      };

      const handleFilesUploaded = ({roomId,name,type,totalChunks,chunkIndex,data,sender ,originalFileName}) => {
        setUploadedFilesMap((prevmap) => {
            const updatedmap = { ...prevmap };
            updatedmap[name] = updatedmap[name] || { type: type, chunks: [] ,originalFileName};
            updatedmap[name].chunks.push({ data, type,sender });
            return updatedmap;
        });
        
      };

      socket.on('connect', () => {
        console.log("connected");
        socket.emit('join-room', { roomId: params.roomId, name: name });
      });

      socket.on('join-msg', handleJoinMsg);
      socket.on("forward-filechunk", handleFilesUploaded);

      socketRef.current = socket;

      return () => {
        socket.off('join-msg', handleJoinMsg);
        socket.off('files-uploaded', handleFilesUploaded);
        socket.off('connect');
        socket.disconnect();
      };
    }
  }, [name, params.roomId]);
  const handleClick = () => {
   
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const newFiles = e.target.files;
  
  
   
 
    Array.from(newFiles).forEach((file) => {
      
      const reader = new FileReader();
      reader.onload = () => {
        const buffer = new Uint8Array(reader.result); 
        console.log("dt", buffer);
        const fileData = {
          name: `${params.roomId}-${file.name}-${uuidv4()}`,
          type: file.type,
          data:buffer,
          size:buffer.length,
          originalFileName:file.name
        
        };
        chunkFiles(fileData,buffer);
      };
  
      reader.readAsArrayBuffer(file);
    });
  
  
    setFiles([...files, ...Array.from(newFiles)]);
  };
  
console.log(uploadedFilesMap)
  
    const chunkFiles = (fileData) => {
        const chunkSize = 1024 * 1024; // 1MB
        const totalChunks = Math.ceil(fileData.size / chunkSize);
        const progressIncrement = 100 / totalChunks; 
        for (let i = 0; i < totalChunks; i++) {
          const start = i * chunkSize;
          const end = Math.min(fileData.size, (i + 1) * chunkSize);
          const chunk = fileData.data.slice(start, end);
          socketRef.current.emit('file-chunk', {
            roomId: params.roomId,
            name: fileData.name,
            type: fileData.type,
            size: fileData.size,
            totalChunks,
            chunkIndex: i,
            data: chunk,
            sender:name,
            originalFileName:fileData.originalFileName
          });
        }
      
      };
    const download = (fileName) => {
     
    const fileData = uploadedFilesMap[fileName];
    try {
        if (!fileData || !fileData.chunks || fileData.chunks.length === 0) {
            console.error(`No chunks found for file ${fileName}`);
            return;
        }
        const binaryChunks = fileData.chunks.map(chunk => chunk.data);
        console.log(binaryChunks);
        const blob = new Blob(binaryChunks, { type: fileData.type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
    } catch (err) {
        console.log(err);
    }
  };

  if (!name) return null;

  return (
    <div className="flex flex-col mx-2 my-4">
      <div className="flex justify-between">
      <span className="font-bold text-gray-500">Room Name</span>
      <Share/>
      </div>
      <p className="font-bold">{params.roomId}</p>
      <div className="relative overflow-x-auto my-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-4">Active User&apos;s</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="my-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-4"> Your Uploaded File List&apos;s</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.name} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {file.name}
                  </th>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="my-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
              <tr className="w-full">
                <th scope="col" className="py-4">Uploaded Files</th>
                <th scope="col" className="py-4">By</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(uploadedFilesMap).map((fileName) => (
                <tr key={fileName} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {uploadedFilesMap[fileName]?.originalFileName}
                  </th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {uploadedFilesMap[fileName]?.chunks[0]?.sender}
                  </th>
                  <th>
                    <button className="btn-primary" onClick={() => download(fileName)}>Download</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <input ref={inputRef} type="file" onChange={handleChange} accept=".txt, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4, .avi, .mov, .zip, .rar, .csv, .json, .xml, .html, .css, .js" multiple style={{ display: 'none' }} />
      <button onClick={handleClick} className="btn-primary mx-auto">Share File</button>

    </div>
  );
};

export default SingleRoom;
