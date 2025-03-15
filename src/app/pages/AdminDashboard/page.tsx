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
import { Company } from "@/types/Company";



export function AdminDashboard() {
    // Load user from local storage
    const { user } = useUserStore();
  
    const { company_name } = useParams();

    const  [isLoading, setIsLoading] = useState(true)

    // useEffect(() => {
    //   if(user){
    //     setIsLoading(false)
    //   }
    // })
  
    // Function to calculate company profile completion
    function calculateCompanyProfileCompletion(companyData: Record<string, any>) {
      const totalFields = Object.keys(companyData).length;
      const missingFields: string[] = [];
    
      // Check for missing fields (null, undefined, or empty array)
      for (const key in companyData) {
        if (
          companyData[key] === null ||
          companyData[key] === undefined ||
          (Array.isArray(companyData[key]) && companyData[key].length === 0)
        ) {
          missingFields.push(key);
        }
      }

    
      const completedFields = totalFields - missingFields.length;
      const isComplete = missingFields.length === 0;
    
      return {
        isComplete,
        completedFields,
        totalFields,
        missingFields,
      };
    }
  
    interface ProfileCompletion{
      isComplete: boolean;
      completedFields: number;
      totalFields: number;
      missingFields: string[];
    }
  
    const [companyProfileCompletion, setCompanyProfileCompletion] = useState<ProfileCompletion>({
      isComplete: false,
      completedFields: 0,
      totalFields: 0,
      missingFields: [],
    });
  
    // Get company profile completion data
    useEffect(() => {
      async function getCompletionData(){
        setIsLoading(true)
        // Logic for getting company data
        const companyInfo = await fetch(`/api/company/get-company?company_id=${user.Company_User[0].company_id}`) 
  
        if(companyInfo.status == 200){
          const data = await companyInfo.json()
  
          setCompanyProfileCompletion(calculateCompanyProfileCompletion(data.company))
        }        
        setIsLoading(false)
      }
      getCompletionData()
    },[user.Company_User])

    if(isLoading){
      return <LoadingDots />;
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center text-sm text-gray-500">
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-black">Dashboard</span>
        </div>
  
        {/* Welcome Banner */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your{" "}
                {(company_name ?? "your-company")
                  .toString()
                  .replaceAll("-", " ") // Replace hyphens with spaces
                  .split(" ") // Split into words
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  ) // Capitalize each word
                  .join(" ")}{" "}
                recruitment dashboard
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${company_name}/dashboard/edit-company`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Building className="w-4 h-4" />
                Company Profile
              </Link>
              <Link
                href={`/${company_name}/dashboard/jobs/create`}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <FileText className="w-4 h-4" />
                Post New Job
              </Link>
            </div>
          </div>
        </div>
  
        {/* Company Profile Completion Alert */}
        {Math.round(
  (companyProfileCompletion.completedFields /
    companyProfileCompletion.totalFields) *
    100
) < 95 && (
  <div className="bg-green-50 border-l-4 border-green-500 rounded-md shadow-sm p-4">
    <div className="flex items-start gap-3">
      <Info className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h2 className="text-sm font-medium text-gray-900">
          Complete your company profile
        </h2>
        <p className="text-xs text-gray-600">
          Your profile is{" "}
          {Math.round(
            (companyProfileCompletion.completedFields /
              companyProfileCompletion.totalFields) *
              100
          )}
          % complete. More details attract better candidates.
        </p>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
          <div
            className="bg-green-500 h-1.5 rounded-full"
            style={{
              width: `${
                (companyProfileCompletion.completedFields /
                  companyProfileCompletion.totalFields) *
                100
              }%`,
            }}
          ></div>
        </div>
      </div>
      <Link
        href={`/${company_name}/dashboard/edit-company`}
        className="px-4 py-2 text-xs bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Complete
      </Link>
    </div>
  </div>
)}

  
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          {[
            {
              title: "Total Jobs",
              value: "24",
              change: "+2 this week",
              icon: <FileText className="w-5 h-5 text-green-600" />,
            },
            {
              title: "Applications",
              value: "156",
              change: "+12 today",
              icon: <Users className="w-5 h-5 text-blue-600" />,
            },
            {
              title: "Hires",
              value: "8",
              change: "+1 this month",
              icon: <CheckCircle className="w-5 h-5 text-purple-600" />,
            },
            {
              title: "Chat Queries",
              value: "432",
              change: "+45 today",
              icon: <MessageSquare className="w-5 h-5 text-orange-600" />,
            },
          ].map((stat) => (
            <div
              key={stat.title}
              className="bg-white p-4 md:p-6 rounded-lg shadow-sm"
            >
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Job Posts</h2>
              <Link
                href="/dashboard/jobs"
                className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
              >
                View All
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
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
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          job.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Job Posts</h2>
              <Link
                href="/dashboard/jobs"
                className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
              >
                View All
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { title: "Senior Developer", status: "Active", applicants: 12 },
                { title: "Product Manager", status: "Active", applicants: 8 },
                { title: "UI/UX Designer", status: "Archived", applicants: 15 },
              ].map((job, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{job.title}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        job.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
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
  
        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Applications</h2>
              <Link
                href="/dashboard/applications"
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
                    <th className="pb-3">Candidate</th>
                    <th className="pb-3">Job</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Applied</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "John Doe",
                      job: "Senior Developer",
                      status: "Interview",
                      date: "2 days ago",
                    },
                    {
                      name: "Jane Smith",
                      job: "Product Manager",
                      status: "Under Review",
                      date: "1 week ago",
                    },
                    {
                      name: "Alex Johnson",
                      job: "UI/UX Designer",
                      status: "Rejected",
                      date: "2 weeks ago",
                    },
                  ].map((app, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-4">
                        <div className="font-medium">{app.name}</div>
                      </td>
                      <td className="py-4">{app.job}</td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                            app.status === "Interview"
                              ? "bg-blue-100 text-blue-800"
                              : app.status === "Under Review"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {app.status === "Interview" ? (
                            <Calendar className="w-3 h-3" />
                          ) : app.status === "Under Review" ? (
                            <Clock className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
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
              {[
                {
                  name: "John Doe",
                  job: "Senior Developer",
                  status: "Interview",
                  date: "2 days ago",
                },
                {
                  name: "Jane Smith",
                  job: "Product Manager",
                  status: "Under Review",
                  date: "1 week ago",
                },
                {
                  name: "Alex Johnson",
                  job: "UI/UX Designer",
                  status: "Rejected",
                  date: "2 weeks ago",
                },
              ].map((app, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="mb-3">
                    <h3 className="font-medium">{app.name}</h3>
                    <p className="text-sm text-gray-600">{app.job}</p>
                  </div>
  
                  <div className="flex justify-between items-center mb-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        app.status === "Interview"
                          ? "bg-blue-100 text-blue-800"
                          : app.status === "Under Review"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {app.status === "Interview" ? (
                        <Calendar className="w-3 h-3" />
                      ) : app.status === "Under Review" ? (
                        <Clock className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
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
      </div>
    );
  }