import React, { useState } from 'react';
import { ChevronDown, Check, Loader2 } from 'lucide-react';
import { ApplicationStage } from '@/types/ApplicationStage';

interface StatusUpdateDropdownProps {
  currentStage: ApplicationStage;
  applicationId: string;
  onStatusUpdate: (newStage: ApplicationStage) => void;
}

const STAGE_OPTIONS: ApplicationStage[] = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'];

const STAGE_COLORS = {
  Applied: 'bg-blue-100 text-blue-800 border-blue-200',
  Screening: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Interview: 'bg-purple-100 text-purple-800 border-purple-200',
  Offer: 'bg-orange-100 text-orange-800 border-orange-200',
  Hired: 'bg-green-100 text-green-800 border-green-200',
};

export default function StatusUpdateDropdown({ 
  currentStage, 
  applicationId, 
  onStatusUpdate 
}: StatusUpdateDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleStageUpdate = async (newStage: ApplicationStage) => {
    if (newStage === currentStage) {
      setIsOpen(false);
      return;
    }

    setIsUpdating(true);
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/job-application/update-stage/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stage: newStage }),
      });

      if (response.ok) {
        onStatusUpdate(newStage);
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 2000);
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating application stage:', error);
      // Here you might want to show an error toast or message
    } finally {
      setIsUpdating(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Application Stage
        </label>
      </div>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={isUpdating}
          className={`
            w-full px-4 py-3 text-left rounded-lg border-2 transition-all duration-200
            ${STAGE_COLORS[currentStage]}
            ${isUpdating ? 'cursor-not-allowed opacity-50' : 'hover:shadow-md cursor-pointer'}
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            flex items-center justify-between font-medium
          `}
        >
          <div className="flex items-center space-x-2">
            {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
            {updateSuccess && <Check className="w-4 h-4 text-green-600" />}
            <span>{currentStage}</span>
          </div>
          <ChevronDown 
            className={`w-5 h-5 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`} 
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
            {STAGE_OPTIONS.map((stage, index) => (
              <button
                key={stage}
                onClick={() => handleStageUpdate(stage)}
                disabled={isUpdating}
                className={`
                  w-full px-4 py-3 text-left transition-colors duration-150
                  ${stage === currentStage 
                    ? 'bg-gray-100 text-gray-500 cursor-default' 
                    : 'hover:bg-gray-50 text-gray-900 cursor-pointer'
                  }
                  ${index !== STAGE_OPTIONS.length - 1 ? 'border-b border-gray-100' : ''}
                  flex items-center justify-between font-medium
                `}
              >
                <span>{stage}</span>
                {stage === currentStage && (
                  <Check className="w-4 h-4 text-gray-400" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}