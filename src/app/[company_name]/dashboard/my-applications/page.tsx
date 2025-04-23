'use client';

import { ChevronRight, Building, MapPin, Clock, CheckCircle2, XCircle, Timer, FileText, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { JobApplication } from '@/types/JobApplication';

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([])

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-gray-500">
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900">My Applications</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <h1 className="text-2xl font-semibold mb-6">My Job Applications</h1>

        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="space-y-4">
            {(applications ?? []).map((application, index) => (
              <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    {/* <img
                      src={application.logo}
                      alt={application.company}
                      className="w-12 h-12 rounded-lg"
                    /> */}
                    <div>
                      <h3 className="font-semibold text-lg">{application.job?.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {application.job?.employment_type}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {application.job?.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Applied {application.appliedAt.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    application.status === 'success' ? 'bg-green-100 text-green-800' :
                    application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {application.status}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  {/* <p className="text-sm text-gray-600">
                    Next Step: {application.nextStep}
                  </p> */}
                  <button className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {applications.map((application, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start gap-3">
                {/* <img
                  src={application.logo}
                  alt={application.company}
                  className="w-10 h-10 rounded-lg"
                /> */}
                <div className="flex-1">
                  <h3 className="font-medium">{application.job?.title}</h3>
                  <p className="text-sm text-gray-600">{application.job?.employment_type}</p>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {application.job?.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {application.appliedAt.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                  application.status === 'success' ? 'bg-green-100 text-green-800' :
                  application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {application.status}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t">
                {/* <p className="text-sm text-gray-600 mb-2">
                  Next Step: {application.nextStep}
                </p> */}
                <button className="w-full text-blue-600 hover:text-blue-800 inline-flex items-center justify-center gap-1 py-2 border rounded-lg">
                  <FileText className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-6">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of{' '}
            <span className="font-medium">8</span> applications
          </div>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center justify-center w-9 h-9 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
              disabled
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center justify-center w-9 h-9 border rounded-lg bg-blue-50 text-blue-600 font-medium">
              1
            </button>
            <button className="inline-flex items-center justify-center w-9 h-9 border rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="inline-flex items-center justify-center w-9 h-9 border rounded-lg hover:bg-gray-50">
              3
            </button>
            <button className="inline-flex items-center justify-center w-9 h-9 border rounded-lg hover:bg-gray-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}