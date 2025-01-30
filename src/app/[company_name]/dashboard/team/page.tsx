'use client';

import { ChevronRight, UserPlus, Edit2, Trash2, Users, Briefcase, Clock, Search, Filter, MoreVertical, ChevronLeft } from 'lucide-react';

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
          <div>
            <h1 className="text-2xl font-semibold">Team Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your recruitment team members</p>
          </div>
          <button className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
            <UserPlus className="w-4 h-4" />
            Add Team Member
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search team members..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-green-600" />
              <span className="text-gray-600">Total Members</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{teamMembers.length}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <span className="text-gray-600">Total Jobs</span>
            </div>
            <p className="text-2xl font-semibold mt-2">
              {teamMembers.reduce((acc, member) => acc + member.jobs, 0)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-purple-600" />
              <span className="text-gray-600">Active Now</span>
            </div>
            <p className="text-2xl font-semibold mt-2">2</p>
          </div>
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
                <tr key={index} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center">
                      <img
                        src={`https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=e5e7eb&color=4b5563`}
                        alt={member.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {member.role}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="font-medium">{member.jobs}</span>
                    <span className="text-gray-500 text-sm"> jobs</span>
                  </td>
                  <td className="py-4">
                    <span className={`flex items-center gap-2 ${
                      member.lastActive.includes('mins') ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        member.lastActive.includes('mins') ? 'bg-green-600' : 'bg-gray-400'
                      }`}></span>
                      {member.lastActive}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
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
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white border rounded-lg p-4 space-y-4 hover:border-gray-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=e5e7eb&color=4b5563`}
                    alt={member.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm mt-1">
                      {member.role}
                    </span>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 py-2 border-t border-b">
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Jobs Assigned
                  </p>
                  <p className="font-medium mt-1">{member.jobs} jobs</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Last Active
                  </p>
                  <p className={`font-medium mt-1 flex items-center gap-2 ${
                    member.lastActive.includes('mins') ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      member.lastActive.includes('mins') ? 'bg-green-600' : 'bg-gray-400'
                    }`}></span>
                    {member.lastActive}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 text-blue-600 hover:bg-blue-50 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button className="flex-1 text-red-600 hover:bg-red-50 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-6">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of{' '}
            <span className="font-medium">12</span> team members
          </div>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center justify-center w-9 h-9 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
              disabled
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center justify-center w-9 h-9 border rounded-lg bg-green-50 text-green-600 font-medium">
              1
            </button>
            <button className="inline-flex items-center justify-center w-9 h-9 border rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="inline-flex items-center justify-center w-9 h-9 border rounded-lg hover:bg-gray-50">
              3
            </button>
            <button className="inline-flex items-center justify-center w-9 h-9 border rounded-lg hover:bg-gray-50">
              4
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