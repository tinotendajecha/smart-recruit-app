import { useState } from "react";
import { Trash2, FileText, Search, FileCode, FileJson } from "lucide-react";
import type { FileData } from "../page";

interface DocumentListTabProps {
  documents: FileData[];
  onDeleteFile: (id: string) => void;
}

const DocumentListTab: React.FC<DocumentListTabProps> = ({ 
  documents, 
  onDeleteFile 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);

  const formatFileSize = (sizeInBytes: number): string => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    } else {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  const getFileIcon = (file_name: string) => {
    if (file_name.includes('pdf')) {
      return <FileText className="w-8 h-8 text-red-500" />;
    } else if (file_name.includes('doc')) {
      return <FileCode className="w-8 h-8 text-blue-500" />;
    } else if (file_name.includes('txt')) {
      return <FileJson className="w-8 h-8 text-gray-500" />;
    } else {
      return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  const handleDelete = (id: string) => {
    if (deleteConfirmation === id) {
      onDeleteFile(id);
      setDeleteConfirmation(null);
    } else {
      setDeleteConfirmation(id);
    }
  };

  const filteredDocuments = documents.filter(doc => 
    doc.file_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search documents..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredDocuments.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? "No documents match your search" : "Upload documents to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <div 
              key={doc.id}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-3">
                {getFileIcon(doc.file_name)}
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {doc.file_name}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  {/* <p className="text-xs text-gray-500">
                    {formatFileSize(doc.size)}
                  </p> */}
                  <p className="text-xs text-gray-500">
                    {new Date(doc.uploadDate).toLocaleDateString()}
                  </p>
                </div>
                <button 
                  className={`p-2 rounded-full ${
                    deleteConfirmation === doc.id 
                      ? "bg-red-100 text-red-600" 
                      : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                  }`}
                  onClick={() => handleDelete(doc.id)}
                  title={deleteConfirmation === doc.id ? "Click again to confirm deletion" : "Delete document"}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentListTab;