'use client';

import { useEffect, useState } from 'react';
import { ChevronRight, Send, Bot, User, Paperclip, Image } from 'lucide-react';
import { useUserStore } from '@/zustand/userDataStore';
import { string } from 'zod';
import { toast } from 'react-toastify';
import { Loading } from '@/components/ui/loading';
import { LoadingDots } from '@/components/ui/loading';

export default function CandidateChatPage() {
  const [message, setMessage] = useState('');
  const user = useUserStore((state) => state.user);
  const userId = user?.id || ''; // Get the user id from the store or set a 

  const [ai_typing, set_ai_typing] = useState(false)
  const[is_loading_messages, set_loading_messages] = useState(false)

  // default value
  const [messages, setMessages] = useState<Message[]>([]);

  interface Message {
    id: string;
    sender: 'ai_agent' | 'user';
    content: string;
    timestamp: string;
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {

        set_loading_messages(true)

        const response = await fetch(`/api/chat/get-messages?userId=${userId}`);
        const data = await response.json();
        setMessages(data.messages);

        set_loading_messages(false)
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [])

  const handleSendPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get the user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Delete text from the input
    setMessage('')

    set_ai_typing(true)

    // Send the messsage to the server
    let ai_agent_call = await fetch('https://wombat-hip-poodle.ngrok-free.app/webhook/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userMessage.content),
    })

    interface agent_response {
      agent_answer: string
    }

    let ai_agent_response: agent_response = await ai_agent_call.json();

    const ai_message = ai_agent_response.agent_answer

    // When AI response is received, save the response to state
    const ai_agent_message: Message = {
      id: Date.now().toString(),
      sender: 'ai_agent',
      content: ai_message,
      timestamp: new Date().toLocaleTimeString(),
    };

    set_ai_typing(false)

    // Set the message to state
    setMessages((prev) => [...prev, ai_agent_message])

    const userData = {
      userId,
      sender: 'user',
      content: userMessage.content
    }

    // Now save the message to the DB
    const saveUserMsg = await fetch('/api/chat/save-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    // Now save the AI Agent message
    const ai_agent_data = {
      userId,
      sender: 'ai_agent',
      content: ai_agent_message.content
    }

    // Save the AI agent response
    const saveAIAgentMsg = await fetch('/api/chat/save-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ai_agent_data),
    })

    if (saveUserMsg.status == 200 && saveAIAgentMsg.status == 200) {
      toast.success('Messages saved to db ✅')
    }

    // Reset the message input

  };

  if(is_loading_messages){
    return(
        <div className="flex flex-col items-center justify-center h-full">
          <Loading text='Loading Chat 💬..' />
        </div>
    )
  }

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
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'ai_agent' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                  {msg.sender === 'ai_agent' ? (
                    <Bot className="w-5 h-5 text-green-600" />
                  ) : (
                    <User className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                { ai_typing && msg.sender === 'ai_agent' ? (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'ai_agent' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    <LoadingDots />
                  </div>
                ) : null}
                <div className={`rounded-lg p-3 ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                  }`}>
                  <p className="whitespace-pre-line">{msg.content}</p>
                  <span className={`text-xs mt-1 block ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
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
            <form onSubmit={handleSendPrompt} className='flex items-center gap-2 w-full'>
              <input
                type="text"
                value={message}
                name='prompt'
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your prompt.."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                type='submit'
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}