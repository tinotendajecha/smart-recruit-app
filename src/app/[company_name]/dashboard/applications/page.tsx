'use client';

import { FileText, Linkedin, ChevronRight, BarChart3, User, Building, Search, ChevronLeft, ChevronDown } from 'lucide-react';

export default function ApplicationsPage() {
  const applications = [
    { 
      name: 'John Doe', 
      position: 'Senior Developer', 
      stage: 'Interview', 
      score: 85,
      resumeUrl: '/resumes/john-doe.pdf',
      linkedinScore: 92
    },
    { 
      name: 'Jane Smith', 
      position: 'Product Manager', 
      stage: 'Screening', 
      score: 92,
      resumeUrl: '/resumes/jane-smith.pdf',
      linkedinScore: 88
    },
    { 
      name: 'Mike Johnson', 
      position: 'UI/UX Designer', 
      stage: 'Applied', 
      score: 78,
      resumeUrl: '/resumes/mike-johnson.pdf',
      linkedinScore: 85
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-gray-500">
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900">Applications</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold">Applications</h1>
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search candidates..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>
        
        {/* Enhanced Filters - Responsive */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex items-center border rounded-lg px-3 py-2 w-full sm:w-48 hover:border-gray-400 transition-colors">
            <Building className="w-4 h-4 mr-2 text-gray-500" />
            <select className="appearance-none bg-transparent focus:outline-none w-full pr-8">
              <option>All Jobs</option>
              <option>Senior Developer</option>
              <option>Product Manager</option>
              <option>UI/UX Designer</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3" />
          </div>
          <div className="relative flex items-center border rounded-lg px-3 py-2 w-full sm:w-48 hover:border-gray-400 transition-colors">
            <BarChart3 className="w-4 h-4 mr-2 text-gray-500" />
            <select className="appearance-none bg-transparent focus:outline-none w-full pr-8">
              <option>All Stages</option>
              <option>Applied</option>
              <option>Screening</option>
              <option>Interview</option>
              <option>Offer</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3" />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Candidate
                  </div>
                </th>
                <th className="pb-3">Position</th>
                <th className="pb-3">Stage</th>
                <th className="pb-3">AI Score</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      {application.name}
                    </div>
                  </td>
                  <td className="py-4">{application.position}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      application.stage === 'Interview' ? 'bg-blue-100 text-blue-800' :
                      application.stage === 'Screening' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {application.stage}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`font-semibold ${
                      application.score >= 90 ? 'text-green-600' :
                      application.score >= 80 ? 'text-blue-600' :
                      'text-yellow-600'
                    }`}>
                      {application.score}%
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <button className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        Resume
                      </button>
                      <button className="text-purple-600 hover:text-purple-800 inline-flex items-center gap-1">
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {applications.map((application, index) => (
            <div key={index} className="bg-white border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{application.name}</h3>
                    <p className="text-sm text-gray-600">{application.position}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  application.stage === 'Interview' ? 'bg-blue-100 text-blue-800' :
                  application.stage === 'Screening' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {application.stage}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-b">
                <span className="text-sm text-gray-600">AI Score</span>
                <span className={`font-semibold ${
                  application.score >= 90 ? 'text-green-600' :
                  application.score >= 80 ? 'text-blue-600' :
                  'text-yellow-600'
                }`}>
                  {application.score}%
                </span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 text-blue-600 hover:text-blue-800 inline-flex items-center justify-center gap-1 py-2">
                  <FileText className="w-4 h-4" />
                  Resume
                </button>
                <button className="flex-1 text-purple-600 hover:text-purple-800 inline-flex items-center justify-center gap-1 py-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Showing 1-3 of 12 results</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center justify-center w-8 h-8 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center justify-center w-8 h-8 border rounded-lg bg-blue-50 text-blue-600 font-medium">1</button>
            <button className="inline-flex items-center justify-center w-8 h-8 border rounded-lg hover:bg-gray-50">2</button>
            <button className="inline-flex items-center justify-center w-8 h-8 border rounded-lg hover:bg-gray-50">3</button>
            <button className="inline-flex items-center justify-center w-8 h-8 border rounded-lg hover:bg-gray-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}