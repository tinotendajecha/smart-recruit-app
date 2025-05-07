"use client";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
// import DocumentUploadTab from "./components/DocumentUploadTab";
// import DocumentListTab from "./components/DocumentListTab";
import DocumentUploadTab from "./components/DocumentUploadTab";
import DocumentListTab from "./components/DocumentListTab";
import { useUserStore } from "@/zustand/userDataStore";

export interface FileData {
  id: string;
  file_name: string;
  type: string;
  uploadDate: string;
}

export default function KnowledgeBasePage() {
  const [activeTab, setActiveTab] = useState<'upload' | 'documents'>('documents');
  const [files, setFiles] = useState<File[]>([]);
  const [documents, setDocuments] = useState<FileData[]>([]);

  const  user  = useUserStore(state => state.user);
  const companyId = user.Company_User[0]?.company_id; // Assuming the first entry is the relevant one

 
    const fetchDocuments = async () => {
      const response = await fetch(`/api/documents/get-documents?companyId=${companyId}`);
      const data = await response.json();
      console.log(data)
      setDocuments(data.documents);
    };

    // fetchDocuments();

    useEffect(() => {
      if(companyId){
        fetchDocuments()
      }
    }, [companyId])


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleDeleteFile = (fileId: string) => {
    setDocuments((documents ?? []).filter(doc => doc.id !== fileId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-gray-500">
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900">Knowledge Base</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <h1 className="text-2xl font-semibold mb-6">Knowledge Base Management</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Total Documents</h3>
            <p className="text-3xl font-bold text-green-600">{documents.length}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Processing Rate</h3>
            <p className="text-3xl font-bold text-blue-600">99.2%</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Avg. Processing Time</h3>
            <p className="text-3xl font-bold text-purple-600">2.4s</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('upload')}
              className={`pb-4 font-medium text-sm ${
                activeTab === 'upload'
                  ? 'border-b-2 border-green-600 text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Upload Documents
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`pb-4 font-medium text-sm ${
                activeTab === 'documents'
                  ? 'border-b-2 border-green-600 text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Document Library
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'upload' ? (
          <DocumentUploadTab 
            files={files} 
            onFileChange={handleFileChange}
            onUploadSuccess = {fetchDocuments}
          />
        ) : (
          <DocumentListTab 
            documents={documents}
            onDeleteFile={handleDeleteFile}
          />
        )}
      </div>
    </div>
  );
}