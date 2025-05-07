import { useEffect, useState } from "react";
import { Upload, FileText } from "lucide-react";
import SelectedFileList from "./SelectedFileList";
import { toast } from "react-toastify";
import { useUserStore } from "@/zustand/userDataStore";
import { set } from "zod";
import { Loading } from "@/components/ui/loading";

interface DocumentUploadTabProps {
  files: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUploadSuccess: () => void;
}

const DocumentUploadTab: React.FC<DocumentUploadTabProps> = ({ 
  files, 
  onFileChange,
  onUploadSuccess
}) => {

  const user = useUserStore((state) => state.user);
  const [companyId, setCompanyId] = useState(user.Company_User[0]?.company_id || '');

  const [uploadingToPinecone, setUploadingToPinecone] = useState(false);
  const [recordingUpload, setRecordingUpload] = useState(false);
  const[refresh, setRefresh] = useState(false);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    console.log('use effect triggered!')
  }, [refresh])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle file upload logic (to be implemented)

    setUploadingToPinecone(true);

    // Get the files from the input element
    const formDataToSend = new FormData()

    const inputElement = document.getElementById("file-upload") as HTMLInputElement;

    let uploadedDocumentName;

    if (inputElement && inputElement.files) {
      Array.from(inputElement.files).forEach(file => {
        formDataToSend.append("data", file);
        uploadedDocumentName = file.name;
        console.log("Document Name: " + uploadedDocumentName)
      });
    }

    // console.log("Files to be uploaded:", formDataToSend.getAll("data"));
    
    const uploadFiles = await fetch("https://wombat-hip-poodle.ngrok-free.app/webhook/upload-to-pinecone", {
      method: "POST",
      body: formDataToSend,
    })

    interface Data{
      status: string;
      message: string;
    }

    const data:Data = await uploadFiles.json();

    if (data.status === '200') {
      setUploadingToPinecone(false);
      setRecordingUpload(true);
      toast.success("Document uploaded!");

      // Record upload in database
      const recordUpload = await fetch("/api/documents/upload", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyId: companyId,
          fileName: uploadedDocumentName,
        })
      })

      const recordUploadData = await recordUpload.json();

      if (recordUpload.status === 201){
        toast.success("Upload recorded✅");
        setRecordingUpload(false);
        setRefresh(!refresh)
      }
      
      onUploadSuccess()
    }

  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      const inputElement = document.getElementById("file-upload") as HTMLInputElement;
      if (inputElement) {
        const dataTransfer = new DataTransfer();
        
        if (inputElement.files) {
          Array.from(inputElement.files).forEach(file => {
            dataTransfer.items.add(file);
          });
        }
        
        Array.from(e.dataTransfer.files).forEach(file => {
          dataTransfer.items.add(file);
        });
        
        inputElement.files = dataTransfer.files;
        
        const event = new Event('change', { bubbles: true });
        inputElement.dispatchEvent(event);
      }
    }
  };

  if(uploadingToPinecone){
    return(
      <div className="flex items-center justify-center h-full">
        <Loading text="Uploading to pinecone 🧠" size="large"/>
      </div>
    )
  }

  if(recordingUpload){
    return(
      <div className="flex items-center justify-center h-full">
        <Loading text="Recording upload ✅" size="large"/>
      </div>
    )
  }

  return (
    <div>
      <div 
        className={`border-2 border-dashed rounded-lg p-4 md:p-8 text-center transition-colors ${
          isDragging ? "border-green-500 bg-green-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">
          Upload Knowledge Base Documents
        </h3>
        <p className="text-gray-500 mb-6">
          Drop your PDF, DOCX, or TXT files here or click to browse
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 inline-flex items-center gap-2 transition-colors">
              <Upload className="w-5 h-5" />
              Select Files
            </div>
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={onFileChange}
            className="hidden"
            id="file-upload"
            multiple
          />
        </form>
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Selected Files</h3>
          <SelectedFileList files={files} />
          
          <div className="mt-6 flex justify-end">
            <button 
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              onClick={handleSubmit}
            >
              Upload Files
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploadTab;