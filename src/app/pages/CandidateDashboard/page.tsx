"use client";

import {
  ChevronRight,
  Eye,
  Edit,
  Users,
  Clock,
  FileText,
  User,
  Calendar,
  MessageSquare,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  XCircle,
  Building,
  Info,
  ArrowRight,
  ClockIcon,
} from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/zustand/userDataStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loading, LoadingBar, LoadingDots } from "@/components/ui/loading";


export default function CandidateDashboard() {
    const { user } = useUserStore();
  
    const applications = [
      {
        jobTitle: "Senior Developer",
        company: "Yirifi",
        status: "Interview",
        date: "2 days ago",
        logo: "https://ui-avatars.com/api/?name=Yirifi&background=0A5C36&color=fff",
      },
      {
        jobTitle: "Full Stack Developer",
        company: "TechCorp",
        status: "Under Review",
        date: "1 week ago",
        logo: "https://ui-avatars.com/api/?name=TC&background=2563eb&color=fff",
      },
      {
        jobTitle: "UI Engineer",
        company: "DesignHub",
        status: "Rejected",
        date: "2 weeks ago",
        logo: "https://ui-avatars.com/api/?name=DH&background=dc2626&color=fff",
      },
    ];
  
    const { company_name } = useParams();
  
    const getStatusColor = (status: any) => {
      switch (status) {
        case "Interview":
          return "bg-blue-100 text-blue-800";
        case "Under Review":
          return "bg-yellow-100 text-yellow-800";
        case "Rejected":
          return "bg-red-100 text-red-800";
        case "Accepted":
          return "bg-green-100 text-green-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };
  
    const getStatusIcon = (status: any) => {
      switch (status) {
        case "Interview":
          return <Calendar className="w-4 h-4" />;
        case "Under Review":
          return <ClockIcon className="w-4 h-4" />;
        case "Rejected":
          return <XCircle className="w-4 h-4" />;
        case "Accepted":
          return <CheckCircle className="w-4 h-4" />;
        default:
          return <AlertCircle className="w-4 h-4" />;
      }
    };
  
    return (
      <div className="space-y-6">
        <div className="flex items-center text-sm text-gray-500">
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-black">Candidate Dashboard</span>
        </div>
  
        {/* Welcome Banner */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold">
                Welcome back, {user.name}
              </h1>
              <p className="text-gray-600 mt-1">
                Your job search journey at a glance
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard/my-profile"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <User className="w-4 h-4" />
                Update Profile
              </Link>
              <Link
                href="/dashboard/candidate-chat"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <MessageSquare className="w-4 h-4" />
                Chat Assistant
              </Link>
            </div>
          </div>
        </div>
  
        {/* Application Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-green-600" />
              <h3 className="text-gray-500 text-sm font-medium">
                Total Applications
              </h3>
            </div>
            <p className="text-2xl font-semibold">5</p>
            <p className="text-sm text-gray-600 mt-1">Across 3 companies</p>
          </div>
  
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <ClockIcon className="w-5 h-5 text-yellow-600" />
              <h3 className="text-gray-500 text-sm font-medium">
                Pending Review
              </h3>
            </div>
            <p className="text-2xl font-semibold">3</p>
            <p className="text-sm text-gray-600 mt-1">
              Applications under review
            </p>
          </div>
  
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="text-gray-500 text-sm font-medium">Interviews</h3>
            </div>
            <p className="text-2xl font-semibold">1</p>
            <p className="text-sm text-gray-600 mt-1">Upcoming this week</p>
          </div>
        </div>
  
        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Applications</h2>
              <Link
                href="/candidate/dashboard/my-applications"
                className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
              >
                View All
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
  
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3">Job</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Applied</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={app.logo}
                            alt={app.company}
                            className="w-8 h-8 rounded-lg"
                          />
                          <div>
                            <div className="font-medium">{app.jobTitle}</div>
                            <div className="text-sm text-gray-500">
                              {app.company}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {getStatusIcon(app.status)}
                          {app.status}
                        </span>
                      </td>
                      <td className="py-4 text-gray-500">{app.date}</td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            View
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
              {applications.map((app, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={app.logo}
                      alt={app.company}
                      className="w-10 h-10 rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium">{app.jobTitle}</h3>
                      <p className="text-sm text-gray-600">{app.company}</p>
                    </div>
                  </div>
  
                  <div className="flex justify-between items-center mb-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {getStatusIcon(app.status)}
                      {app.status}
                    </span>
                    <span className="text-sm text-gray-500">{app.date}</span>
                  </div>
  
                  <button className="w-full text-blue-600 hover:text-blue-800 inline-flex items-center justify-center gap-1 py-2 border rounded-lg">
                    <Eye className="w-4 h-4" />
                    View Application
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Chat Assistant Promo */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-2">
                Have questions about your applications?
              </h2>
              <p className="text-gray-600">
                Our AI assistant can help you with interview preparation,
                application status, company information, and more. Get instant
                answers to your questions!
              </p>
            </div>
            <Link
              href="/candidate/dashboard/candidate-chat"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 whitespace-nowrap"
            >
              <MessageSquare className="w-5 h-5" />
              Chat Now
            </Link>
          </div>
        </div>
  
        {/* Job Recommendations */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium">Frontend Developer</h3>
              <p className="text-sm text-gray-600 mb-3">TechSolutions Inc.</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                  Remote
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                  Full-time
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                  $90k-$120k
                </span>
              </div>
              <button className="w-full text-green-600 hover:text-green-700 inline-flex items-center justify-center gap-1 py-2 border border-green-600 rounded-lg">
                View Job
              </button>
            </div>
  
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium">React Developer</h3>
              <p className="text-sm text-gray-600 mb-3">InnovateTech</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                  Hybrid
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                  Full-time
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                  $100k-$130k
                </span>
              </div>
              <button className="w-full text-green-600 hover:text-green-700 inline-flex items-center justify-center gap-1 py-2 border border-green-600 rounded-lg">
                View Job
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }