'use client';

import { ChevronRight } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-gray-500">
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900">Settings</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive updates about new applications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="font-medium">Desktop Notifications</h3>
                  <p className="text-sm text-gray-500">Get instant alerts in your browser</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t">
            <h2 className="text-lg font-medium mb-4">AI Configuration</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resume Analysis Threshold
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="80"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Strict</span>
                  <span>Lenient</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chat Agent Response Style
                </label>
                <select className="w-full px-3 py-2 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Technical</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}