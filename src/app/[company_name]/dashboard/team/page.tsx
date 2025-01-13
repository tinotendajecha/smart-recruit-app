'use client';

import { ChevronRight } from 'lucide-react';

export default function TeamPage() {
  const teamMembers = [
    { name: 'Sarah Wilson', role: 'Senior Recruiter', jobs: 8, lastActive: '2 mins ago' },
    { name: 'Michael Brown', role: 'HR Manager', jobs: 12, lastActive: '1 hour ago' },
    { name: 'Emily Davis', role: 'Recruiter', jobs: 5, lastActive: '3 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-gray-500">
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900">Team</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold">Team Management</h1>
          <button className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Add Team Member
          </button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-3">Name</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Jobs Assigned</th>
                <th className="pb-3">Last Active</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="py-4">
                    <div className="flex items-center">
                      <img
                        src={`https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}`}
                        alt={member.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      {member.name}
                    </div>
                  </td>
                  <td className="py-4">{member.role}</td>
                  <td className="py-4">{member.jobs}</td>
                  <td className="py-4">
                    <span className="text-gray-500">{member.lastActive}</span>
                  </td>
                  <td className="py-4">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white border rounded-lg p-4 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}`}
                  alt={member.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-2 border-t border-b">
                <div>
                  <p className="text-sm text-gray-500">Jobs Assigned</p>
                  <p className="font-medium">{member.jobs}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Active</p>
                  <p className="font-medium">{member.lastActive}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 text-blue-600 hover:text-blue-800 py-2">
                  Edit
                </button>
                <button className="flex-1 text-red-600 hover:text-red-800 py-2">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}