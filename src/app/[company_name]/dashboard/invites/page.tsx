'use client';

import { useState } from 'react';
import { 
  ChevronRight, 
  UserPlus, 
  Mail, 
  Search, 
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  RefreshCw
} from 'lucide-react';

export default function InvitesPage() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');

  // Mock data - replace with your actual data
  const invites = [
    {
      id: 1,
      email: 'sarah.wilson@example.com',
      role: 'Recruiter',
      status: 'pending',
      sentAt: '2 hours ago',
      expiresIn: '22 hours'
    },
    {
      id: 2,
      email: 'john.doe@example.com',
      role: 'HR Manager',
      status: 'accepted',
      sentAt: '1 day ago',
      expiresIn: null
    },
    {
      id: 3,
      email: 'mike.brown@example.com',
      role: 'Employee',
      status: 'expired',
      sentAt: '5 days ago',
      expiresIn: null
    },
    {
      id: 4,
      email: 'emma.smith@example.com',
      role: 'Recruiter',
      status: 'declined',
      sentAt: '2 days ago',
      expiresIn: null
    }
  ];

  const getStatusColor = (status:any) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status:any) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'expired':
        return <RefreshCw className="w-4 h-4" />;
      case 'declined':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500">
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900">Workspace Invites</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold">Workspace Invites</h1>
          
          {/* New Invite Button */}
          <button 
            className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 inline-flex items-center justify-center gap-2"
            onClick={() => {
              // Handle new invite
            }}
          >
            <UserPlus className="w-5 h-5" />
            Send New Invite
          </button>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by email..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select 
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="expired">Expired</option>
                <option value="declined">Declined</option>
              </select>

              <select 
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="recruiter">Recruiter</option>
                <option value="hr">HR Manager</option>
                <option value="employee">Employee</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-3">Email</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Sent</th>
                <th className="pb-3">Expires In</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invites.map((invite) => (
                <tr key={invite.id} className="border-b last:border-b-0">
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {invite.email}
                    </div>
                  </td>
                  <td className="py-4">{invite.role}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(invite.status)}`}>
                      {getStatusIcon(invite.status)}
                      {invite.status.charAt(0).toUpperCase() + invite.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 text-gray-500">{invite.sentAt}</td>
                  <td className="py-4 text-gray-500">
                    {invite.expiresIn || '-'}
                  </td>
                  <td className="py-4">
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {invites.map((invite) => (
            <div key={invite.id} className="bg-white border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{invite.email}</span>
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(invite.status)}`}>
                  {getStatusIcon(invite.status)}
                  {invite.status.charAt(0).toUpperCase() + invite.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Role</p>
                  <p className="font-medium">{invite.role}</p>
                </div>
                <div>
                  <p className="text-gray-500">Sent</p>
                  <p className="font-medium">{invite.sentAt}</p>
                </div>
                {invite.expiresIn && (
                  <div>
                    <p className="text-gray-500">Expires In</p>
                    <p className="font-medium">{invite.expiresIn}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2 border-t">
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}