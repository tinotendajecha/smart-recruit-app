'use client'

import { Briefcase, Plus, Eye, Edit, Trash2, Building, MapPin, Clock, DollarSign, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function JobsPage() {
  const { company_name } = useParams();

  const jobs = [
    { 
      title: 'Senior Developer', 
      department: 'Engineering', 
      location: 'Remote', 
      status: 'Active',
      details: {
        type: 'Full-time',
        salary: '$120k - $150k',
        posted: '2 days ago',
        description: 'We are looking for an experienced developer...'
      }
    },
    { 
      title: 'Product Manager', 
      department: 'Product', 
      location: 'New York', 
      status: 'Active',
      details: {
        type: 'Full-time',
        salary: '$130k - $160k',
        posted: '1 week ago',
        description: 'Seeking a product manager to lead...'
      }
    },
    { 
      title: 'UI/UX Designer', 
      department: 'Design', 
      location: 'London', 
      status: 'Archived',
      details: {
        type: 'Contract',
        salary: '$90k - $110k',
        posted: '3 days ago',
        description: 'Looking for a creative designer...'
      }
    },
  ];

  return (
    <div className='space-y-6'>
      <div className="flex items-center text-sm text-gray-500">
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900">Jobs</span>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold">Jobs Management</h1>
          <Link href={`/${company_name}/dashboard/jobs/create`}>
            <button className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 inline-flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              Create New Job
            </button>
          </Link>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Job Title
                  </div>
                </th>
                <th className="pb-3">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Department
                  </div>
                </th>
                <th className="pb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </div>
                </th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="py-4">{job.title}</td>
                  <td className="py-4">{job.department}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      {job.location}
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 inline-flex items-center gap-1">
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 inline-flex items-center gap-1">
                        <Trash2 className="w-4 h-4" />
                        Delete
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
          {jobs.map((job, index) => (
            <div key={index} className="bg-white border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{job.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {job.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  {job.department}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {job.details.posted}
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  {job.details.salary}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t">
                <button className="flex-1 text-blue-600 hover:text-blue-800 inline-flex items-center justify-center gap-1 py-2">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button className="flex-1 text-gray-600 hover:text-gray-800 inline-flex items-center justify-center gap-1 py-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="flex-1 text-red-600 hover:text-red-800 inline-flex items-center justify-center gap-1 py-2">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}