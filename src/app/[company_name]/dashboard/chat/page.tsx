'use client';

import { ChevronRight, Upload } from 'lucide-react';

export default function ChatAgentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-gray-500">
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900">Chat Agent</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <h1 className="text-2xl font-semibold mb-6">Chat Agent Management</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Today's Queries</h3>
            <p className="text-3xl font-bold text-green-600">247</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Response Rate</h3>
            <p className="text-3xl font-bold text-blue-600">98.5%</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Avg. Response Time</h3>
            <p className="text-3xl font-bold text-purple-600">1.2s</p>
          </div>
        </div>
        
        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-8 text-center">
          <h3 className="text-lg font-medium mb-2">Upload Knowledge Base Documents</h3>
          <p className="text-gray-500 mb-4">Drop your PDF, DOCX, or TXT files here</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 inline-flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Select Files
          </button>
        </div>
      </div>

      {/* Test Chat Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4">Test Chat Agent</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Type a test question..."
            className="flex-1 border rounded-lg px-4 py-2"
          />
          <button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Test
          </button>
        </div>
      </div>
    </div>
  );
}