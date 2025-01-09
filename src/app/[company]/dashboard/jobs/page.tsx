'use client'

import { Briefcase, Plus, Eye, Edit, Trash2, Building, MapPin, Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function JobsPage({params} : {params: {company: string}}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-2xl font-semibold mb-6">Jobs Management</h1>
      <div className="mb-6">
        <Link href={`/${params.company}/dashboard/jobs/create`}>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 inline-flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create New Job
        </button>
        </Link>
      </div>
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
          {[
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
          ].map((job, index) => (
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
                  <button 
                    className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                    onClick={() => {
                      // Show job details modal
                      alert(`
                        ${job.title}
                        ${job.details.type} | ${job.details.salary}
                        Posted: ${job.details.posted}
                        
                        ${job.details.description}
                      `);
                    }}
                  >
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
  );
}