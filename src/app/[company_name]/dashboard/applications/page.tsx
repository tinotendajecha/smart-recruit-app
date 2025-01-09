'use client'


import { FileText, Linkedin, ChevronRight, BarChart3, User, Building } from 'lucide-react';

export default function ApplicationsPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-2xl font-semibold mb-6">Applications</h1>
      <div className="flex gap-4 mb-6">
        <div className="flex items-center border rounded-lg px-3 py-2">
          <Building className="w-4 h-4 mr-2 text-gray-500" />
          <select className="bg-transparent focus:outline-none">
            <option>All Jobs</option>
            <option>Senior Developer</option>
            <option>Product Manager</option>
            <option>UI/UX Designer</option>
          </select>
        </div>
        <div className="flex items-center border rounded-lg px-3 py-2">
          <BarChart3 className="w-4 h-4 mr-2 text-gray-500" />
          <select className="bg-transparent focus:outline-none">
            <option>All Stages</option>
            <option>Applied</option>
            <option>Screening</option>
            <option>Interview</option>
            <option>Offer</option>
          </select>
        </div>
      </div>
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
            <th className="pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Resume
              </div>
            </th>
            <th className="pb-3">
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn Analysis
              </div>
            </th>
            <th className="pb-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[
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
          ].map((application, index) => (
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
                <button 
                  className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                  onClick={() => window.open(application.resumeUrl, '_blank')}
                >
                  <FileText className="w-4 h-4" />
                  View Resume
                </button>
              </td>
              <td className="py-4">
                <button 
                  className="text-purple-600 hover:text-purple-800 inline-flex items-center gap-1"
                  onClick={() => {
                    // Open LinkedIn analysis modal/drawer
                  }}
                >
                  <Linkedin className="w-4 h-4" />
                  View Analysis ({application.linkedinScore}%)
                </button>
              </td>
              <td className="py-4">
                <button className="text-blue-600 hover:text-blue-800 mr-2 inline-flex items-center gap-1">
                  View
                </button>
                <button className="text-green-600 hover:text-green-800">Move Stage</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}