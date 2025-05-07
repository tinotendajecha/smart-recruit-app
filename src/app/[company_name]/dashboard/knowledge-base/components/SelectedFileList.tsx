import { FileText, FileCode, FileJson } from "lucide-react";

interface SelectedFileListProps {
  files: File[];
}

const SelectedFileList: React.FC<SelectedFileListProps> = ({ files }) => {
  const formatFileSize = (sizeInBytes: number): string => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    } else {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) {
      return <FileText className="w-8 h-8 text-red-500" />;
    } else if (fileType.includes('doc')) {
      return <FileCode className="w-8 h-8 text-blue-500" />;
    } else if (fileType.includes('txt')) {
      return <FileJson className="w-8 h-8 text-gray-500" />;
    } else {
      return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-3">
      {files.map((file, index) => (
        <div 
          key={`${file.name}-${index}`}
          className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div className="mr-3">
            {getFileIcon(file.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {file.name}
            </p>
            <p className="text-xs text-gray-500">
              {formatFileSize(file.size)} • {file.type || 'Unknown type'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedFileList;