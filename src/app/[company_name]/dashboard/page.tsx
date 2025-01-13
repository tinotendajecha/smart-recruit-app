'use client';

import { ChevronRight, Eye, Edit, Users, Clock } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-gray-500">
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-black">Dashboard</span>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        {[
          { title: "Total Jobs", value: "24", change: "+2 this week", icon: <Users className="w-5 h-5 text-green-600" /> },
          { title: "Applications", value: "156", change: "+12 today", icon: <Users className="w-5 h-5 text-blue-600" /> },
          { title: "Hires", value: "8", change: "+1 this month", icon: <Users className="w-5 h-5 text-purple-600" /> },
          { title: "Chat Queries", value: "432", change: "+45 today", icon: <Clock className="w-5 h-5 text-orange-600" /> },
        ].map((stat) => (
          <div key={stat.title} className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              {stat.icon}
              <h3 className="text-gray-500 text-sm font-medium">
                {stat.title}
              </h3>
            </div>
            <p className="text-2xl font-semibold">{stat.value}</p>
            <p className="text-sm text-green-600 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Jobs Table - Desktop Version */}
      <div className="bg-white rounded-lg shadow-sm hidden md:block">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Job Posts</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-3">Job Title</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Applicants</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { title: "Senior Developer", status: "Active", applicants: 12 },
                { title: "Product Manager", status: "Active", applicants: 8 },
                { title: "UI/UX Designer", status: "Archived", applicants: 15 },
              ].map((job, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="py-4">{job.title}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      job.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td>{job.applicants}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 inline-flex items-center gap-1">
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Jobs - Mobile Version */}
      <div className="bg-white rounded-lg shadow-sm md:hidden">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Job Posts</h2>
          <div className="space-y-4">
            {[
              { title: "Senior Developer", status: "Active", applicants: 12 },
              { title: "Product Manager", status: "Active", applicants: 8 },
              { title: "UI/UX Designer", status: "Archived", applicants: 15 },
            ].map((job, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{job.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    job.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {job.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {job.applicants} applicants
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 inline-flex items-center gap-1">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}