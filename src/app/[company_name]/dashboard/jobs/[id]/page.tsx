'use client';

import { 
  Briefcase, 
  Building, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users,
  Calendar,
  ChevronRight,
  Edit,
  Share2,
  Archive
} from 'lucide-react';

// This would normally come from an API or database
const jobData = {
  id: '1',
  title: 'Senior Developer',
  department: 'Engineering',
  type: 'Full-time',
  location: 'Remote',
  status: 'Active',
  postedDate: '2 days ago',
  deadline: '2024-02-28',
  salary: {
    min: 120000,
    max: 150000
  },
  applicants: 12,
  description: 'We are looking for an experienced developer to join our team...',
  responsibilities: [
    'Lead development of key features',
    'Mentor junior developers',
    'Participate in system design',
    'Code review and quality assurance'
  ],
  requirements: [
    '5+ years of experience in web development',
    'Strong knowledge of React and Node.js',
    'Experience with cloud platforms (AWS/GCP)',
    'Excellent communication skills'
  ],
  benefits: [
    'Competitive salary',
    'Remote work options',
    'Health insurance',
    '401(k) matching',
    'Professional development budget'
  ]
};

export default function JobDetailsPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500">
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Jobs</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900">{jobData.title}</span>
      </div>

      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">{jobData.title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                <span>{jobData.department}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{jobData.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Posted {jobData.postedDate}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 inline-flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Share
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 inline-flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Edit
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-red-600 inline-flex items-center gap-2">
              <Archive className="w-5 h-5" />
              Archive
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Users className="w-5 h-5" />
              <span>Total Applicants</span>
            </div>
            <p className="text-2xl font-semibold">{jobData.applicants}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Calendar className="w-5 h-5" />
              <span>Application Deadline</span>
            </div>
            <p className="text-2xl font-semibold">{jobData.deadline}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <DollarSign className="w-5 h-5" />
              <span>Salary Range</span>
            </div>
            <p className="text-2xl font-semibold">
              ${jobData.salary.min.toLocaleString()} - ${jobData.salary.max.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <span className={`px-3 py-1 rounded-full text-sm ${
            jobData.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {jobData.status}
          </span>
        </div>

        {/* Job Details */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Job Description</h2>
            <p className="text-gray-600">{jobData.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {jobData.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Requirements</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {jobData.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Benefits</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {jobData.benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}