'use client';

import { useState } from 'react';
import { ChevronRight, Send, Bot, User, Paperclip, Image } from 'lucide-react';

export default function CandidateChatPage() {
  const [message, setMessage] = useState('');

  const messages = [
    {
      type: 'bot',
      content: 'Hello! I\'m your AI assistant. How can I help you with your job search today?',
      timestamp: '10:00 AM'
    },
    {
      type: 'user',
      content: 'I\'d like to know about the requirements for the Senior Developer position',
      timestamp: '10:01 AM'
    },
    {
      type: 'bot',
      content: 'For the Senior Developer position, the key requirements are:\n\n• 5+ years of experience in web development\n• Strong knowledge of React and Node.js\n• Experience with cloud platforms (AWS/GCP)\n• Excellent communication skills\n\nWould you like me to provide more details about any of these requirements?',
      timestamp: '10:01 AM'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-gray-500">
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900">Chat Assistant</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 flex flex-col h-[calc(100vh-12rem)]">
        <div className="flex items-center gap-3 pb-4 border-b">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Bot className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="font-semibold">AI Recruitment Assistant</h2>
            <p className="text-sm text-gray-500">Always here to help</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.type === 'bot' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {msg.type === 'bot' ? (
                    <Bot className="w-5 h-5 text-green-600" />
                  ) : (
                    <User className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div className={`rounded-lg p-3 ${
                  msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="whitespace-pre-line">{msg.content}</p>
                  <span className={`text-xs mt-1 block ${
                    msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Paperclip className="w-5 h-5 text-gray-500" />
            </button>
            {/* <button className="p-2 hover:bg-gray-100 rounded-full">
              <Image className="w-5 h-5 text-gray-500" />
            </button> */}
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button 
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
              onClick={() => setMessage('')}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}