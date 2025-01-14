'use client';

import { ChevronRight, Building, MapPin, Clock, CheckCircle2, XCircle, Timer, FileText } from 'lucide-react';

export default function MyApplicationsPage() {
  const applications = [
    {
      company: 'Yirifi',
      position: 'Senior Developer',
      location: 'Remote',
      appliedDate: '2 days ago',
      status: 'Interview Scheduled',
      statusType: 'success',
      nextStep: 'Technical Interview on Feb 28, 2024',
      logo: 'https://ui-avatars.com/api/?name=Yirifi&background=0A5C36&color=fff'
    },
    {
      company: 'TechCorp',
      position: 'Full Stack Developer',
      location: 'New York',
      appliedDate: '1 week ago',
      status: 'Under Review',
      statusType: 'pending',
      nextStep: 'Application being reviewed',
      logo: 'https://ui-avatars.com/api/?name=TC&background=2563eb&color=fff'
    },
    {
      company: 'DesignHub',
      position: 'UI Engineer',
      location: 'London',
      appliedDate: '2 weeks ago',
      status: 'Rejected',
      statusType: 'rejected',
      nextStep: 'Position filled',
      logo: 'https://ui-avatars.com/api/?name=DH&background=dc2626&color=fff'
    }
  ];

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
            {applications.map((application, index) => (
              <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <img
                      src={application.logo}
                      alt={application.company}
                      className="w-12 h-12 rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{application.position}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {application.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {application.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Applied {application.appliedDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    application.statusType === 'success' ? 'bg-green-100 text-green-800' :
                    application.statusType === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {application.status}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Next Step: {application.nextStep}
                  </p>
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
                <img
                  src={application.logo}
                  alt={application.company}
                  className="w-10 h-10 rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{application.position}</h3>
                  <p className="text-sm text-gray-600">{application.company}</p>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {application.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {application.appliedDate}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                  application.statusType === 'success' ? 'bg-green-100 text-green-800' :
                  application.statusType === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {application.status}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t">
                <p className="text-sm text-gray-600 mb-2">
                  Next Step: {application.nextStep}
                </p>
                <button className="w-full text-blue-600 hover:text-blue-800 inline-flex items-center justify-center gap-1 py-2 border rounded-lg">
                  <FileText className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}