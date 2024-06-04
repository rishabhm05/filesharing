import ProgressBar from '@ramonak/react-progress-bar'
import React from 'react'

const Uploaded = ({uploadedFilesMap,download,completed}) => {
 
  return (
    <div className="my-4">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
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
            <ProgressBar completed={completed}/>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default Uploaded