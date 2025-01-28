'use client'
import React, { useState } from 'react';
import { CircleDot, Linkedin, Twitter, Smile, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useQuestionnaireStore } from '@/zustand/questionnaireStore';

function App() {
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const { setQuestionnaireAnswers } = useQuestionnaireStore()

  const router = useRouter()

  const handleNextPage = () => {
    if (!selectedPurpose || !selectedSource) {
      alert('Please answer both questions to continue');
      return;
    }
    
    // Values to save to database
    const userSelections = {
      purpose: selectedPurpose,
      source: selectedSource
    };
    
    // Set answers to global store
    setQuestionnaireAnswers(userSelections)

    if(userSelections.purpose == 'I am a recruiter'){
      router.push('/register/company')
    }else{
      router.push('/register/user')
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-green-50 items-center justify-center p-12">
        <div className="max-w-lg">
          <div className="relative w-full max-w-[300px] aspect-square mx-auto">
            {/* New abstract illustration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-4/5 h-4/5">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-green-200 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute inset-8 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <CircleDot className="w-12 h-12 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Smart Recruitment for Everyone</h2>
            <p className="mt-2 text-gray-600">
              Whether you're a company seeking talent or a professional pursuing opportunities,
              our platform adapts to your unique needs.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Questionnaire */}
      <div className="flex-1 p-6 lg:p-12 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Quick Questionnaire
            </h1>
            <p className="text-gray-600">
              Help us personalize your experience by answering a few questions.
            </p>
          </div>

          <div className="space-y-8">
            {/* Question 1 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">
                What are you looking to use SmartRecruit for?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['I am a recruiter', 'I am actively applying for a job'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedPurpose(option)}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      selectedPurpose === option
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <span className="text-lg font-medium">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Where did you hear about SmartRecruit?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Twitter', icon: Twitter },
                  { label: 'LinkedIn', icon: Linkedin },
                  { label: 'Friend', icon: Smile },
                  { label: 'Other', icon: Globe }
                ].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => setSelectedSource(label)}
                    className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center justify-center space-y-2 ${
                      selectedSource === label
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              className={`w-full py-4 px-6 rounded-lg text-white font-semibold transition-all ${
                selectedPurpose && selectedSource
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              disabled={!selectedPurpose || !selectedSource}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;