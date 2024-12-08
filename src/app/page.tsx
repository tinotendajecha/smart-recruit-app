'use client'
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleUploadPdfFILE =  async(e: React.FormEvent) => {
    e.preventDefault()
    
    if(!selectedFile){
      alert('Please select a file to upload')
      return
    }

    const formData = new FormData()

    formData.append('file', selectedFile)

    try {
      const response = await fetch(`/api/upload_pdf`, {
        method: 'POST',
        body: formData
      })

      if (response.ok){
        alert('File Uplaoded Succesfully!')
      }
    } catch (error) {
      console.log(error)
    }

  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]){
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="flex flex-col min-h-full items-center mt-40">
      <form onSubmit={handleUploadPdfFILE} className="flex flex-col">
        <h1>Upload document</h1>
        <input type="file" 
          id="inputFile"
          accept="application/pdf"
          onChange={handleFileChange}
          placeholder="Upload a pdf document" />
          <div>
           <button className="bg-green-500 text-white rounded-md mt-5 text-md p-2">Upload</button>
          </div>
      </form>
    </div>
  );
}
