import React, { useEffect, useState } from 'react';
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
  Loader2,
} from "lucide-react";

import { useUserStore } from '@/zustand/userDataStore';
import { useParams } from 'next/navigation';

// Types
interface Job {
  id: string;
  title: string;
  status: string;
  applicant_count?: number;
  created_at: string;
}

interface Application {
  id: string;
  user: {
    name: string;
    email: string;
  };
  job: {
    title: string;
  };
  application_stage: string;
  created_at: string;
}

interface ApiResponse<T> {
  data: T;
  totalApplications?: number;
  totalPages?: number;
  currentPage?: number;
}

interface Stats {
  totalJobs: number;
  totalApplications: number;
  totalHires: number;
  chatQueries: number;
}

interface CompanyProfileCompletion {
  isComplete: boolean;
  completedFields: number;
  totalFields: number;
  missingFields: string[];
}

export default function Dashboard() {
  const params = useParams()
  
  // State management
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalJobs: jobs.length,
    totalApplications: 0,
    totalHires: 0,
    chatQueries: 0
  });

  const [companyProfileCompletion, setCompanyProfileCompletion] = useState<CompanyProfileCompletion>({
    isComplete: false,
    completedFields: 0,
    totalFields: 0,
    missingFields: [],
  });
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  
  // Error states
  const [error, setError] = useState<string | null>(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Mock user data (since we don't have access to the actual user store)
  const user = useUserStore((state) => state.user);

   const companyId = user?.Company_User[0].company_id as string;
   const companyName = params.companyName as string;

  // Helper function to calculate company profile completion
  function calculateCompanyProfileCompletion(companyData: Record<string, any>): CompanyProfileCompletion {
    const totalFields = Object.keys(companyData).length;
    const missingFields: string[] = [];

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

  // API call functions
  const fetchJobs = async () => {
    setJobsLoading(true);
    try {
      const response = await fetch(`/api/jobs/get-jobs/?companyId=${companyId}`);

      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();

      console.log(data)

      // setJobs(Array.isArray(data) ? data : []);
      setJobs(data.jobs || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setJobs([]);
    } finally {
      setJobsLoading(false);
    }
  };

  const fetchApplications = async (page = 1, limit = 5) => {
    setApplicationsLoading(true);
    try {
      const response = await fetch(`/api/job-application/by-company?company_id=${companyId}&page=${page}&limit=${limit}`);


      
      if (!response.ok) throw new Error('Failed to fetch applications');
      const data = await response.json();


      
      setApplications(data.applications);
      setCurrentPage(data.currentPage || 1);
      setTotalPages(data.totalPages || 1);
      
      // Update total applications in stats
      setStats(prev => ({
        ...prev,
        totalApplications: data.totalApplications || 0
      }));
    } catch (err) {
      console.error('Error fetching applications:', err);
      setApplications([]);
    } finally {
      setApplicationsLoading(false);
    }
  };

  const fetchHiredApplicants = async () => {
    try {
      const response = await fetch('/api/job-application/get-by-application-stage/Hired');
      if (!response.ok) throw new Error('Failed to fetch hired applicants');
      const data = await response.json();
      
      setStats(prev => ({
        ...prev,
        totalHires: data.applications.length
      }));
    } catch (err) {
      console.error('Error fetching hired applicants:', err);
    }
  };

  const fetchCompanyProfile = async () => {
    try {
      const response = await fetch(`/api/company/get-company?company_id=${companyId}`);
      if (response.ok) {
        const data = await response.json();
        setCompanyProfileCompletion(calculateCompanyProfileCompletion(data.company));
      }
    } catch (err) {
      console.error('Error fetching company profile:', err);
    }
  };

  // Initialize dashboard data
  useEffect(() => {
    const initializeDashboard = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        await Promise.all([
          fetchJobs(),
          fetchApplications(1, 5),
          fetchHiredApplicants(),
          fetchCompanyProfile()
        ]);
        
        // Update jobs count after fetching
        setStats(prev => ({
          ...prev,
          totalJobs: jobs.length,
          chatQueries: 432 // This would come from another API endpoint
        }));
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeDashboard();
  }, []);

  // Update jobs count when jobs data changes
  useEffect(() => {
    setStats(prev => ({
      ...prev,
      totalJobs: jobs.length
    }));
  }, [jobs]);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchApplications(currentPage + 1, 5);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchApplications(currentPage - 1, 5);
    }
  };

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      case 'interview':
        return 'bg-blue-100 text-blue-800';
      case 'under review':
        return 'bg-yellow-100 text-yellow-800';
      case 'hired':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'interview':
        return <Calendar className="w-3 h-3" />;
      case 'under review':
        return <Clock className="w-3 h-3" />;
      case 'hired':
        return <CheckCircle className="w-3 h-3" />;
      case 'rejected':
        return <XCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
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
              Manage your {companyName?.replaceAll("-", " ")} recruitment dashboard
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Building className="w-4 h-4" />
              Company Profile
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <FileText className="w-4 h-4" />
              Post New Job
            </button>
          </div>
        </div>
      </div>

      {/* Company Profile Completion Alert */}
      {Math.round((companyProfileCompletion.completedFields / companyProfileCompletion.totalFields) * 100) < 95 && (
        <div className="bg-green-50 border-l-4 border-green-500 rounded-md shadow-sm p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h2 className="text-sm font-medium text-gray-900">
                Complete your company profile
              </h2>
              <p className="text-xs text-gray-600">
                Your profile is{" "}
                {Math.round((companyProfileCompletion.completedFields / companyProfileCompletion.totalFields) * 100)}
                % complete. More details attract better candidates.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div
                  className="bg-green-500 h-1.5 rounded-full"
                  style={{
                    width: `${(companyProfileCompletion.completedFields / companyProfileCompletion.totalFields) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <button className="px-4 py-2 text-xs bg-green-600 text-white rounded-md hover:bg-green-700">
              Complete
            </button>
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        {[
          {
            title: "Total Jobs",
            value: statsLoading ? "..." : stats.totalJobs.toString(),
            change: `+${Math.max(0, stats.totalJobs - 20)} this week`,
            icon: <FileText className="w-5 h-5 text-green-600" />,
          },
          {
            title: "Applications",
            value: applicationsLoading ? "..." : stats.totalApplications.toString(),
            change: `+${Math.floor(stats.totalApplications * 0.1)} today`,
            icon: <Users className="w-5 h-5 text-blue-600" />,
          },
          {
            title: "Hires",
            value: stats.totalHires.toString(),
            change: `+${Math.max(0, stats.totalHires - 5)} this month`,
            icon: <CheckCircle className="w-5 h-5 text-purple-600" />,
          },
          {
            title: "Chat Queries",
            value: stats.chatQueries.toString(),
            change: "+45 today",
            icon: <MessageSquare className="w-5 h-5 text-orange-600" />,
          },
        ].map((stat) => (
          <div key={stat.title} className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              {stat.icon}
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            </div>
            <p className="text-2xl font-semibold">{stat.value}</p>
            <p className="text-sm text-green-600 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Jobs Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Job Posts</h2>
            <button className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1">
              View All
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          
          {jobsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <>
              {/* Desktop Version */}
              <div className="hidden md:block">
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
                    {jobs.slice(0, 5).map((job) => (
                      <tr key={job.id} className="border-b last:border-b-0">
                        <td className="py-4">{job.title}</td>
                        <td>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(job.status)}`}>
                            {job.status}
                          </span>
                        </td>
                        <td>{job.applicant_count || 0}</td>
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

              {/* Mobile Version */}
              <div className="md:hidden space-y-4">
                {jobs.slice(0, 3).map((job) => (
                  <div key={job.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{job.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      {job.applicant_count || 0} applicants
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
            </>
          )}
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Applications</h2>
            <button className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1">
              View All
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {applicationsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <>
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
                    {applications.map((app) => (
                      <tr key={app.id} className="border-b last:border-b-0">
                        <td className="py-4">
                          <div className="font-medium">{app.user.name}</div>
                        </td>
                        <td className="py-4">{app.job.title}</td>
                        <td className="py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(app.application_stage)}`}>
                            {getStatusIcon(app.application_stage)}
                            {app.application_stage}
                          </span>
                        </td>
                        <td className="py-4 text-gray-500">{formatDate(app.created_at)}</td>
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
                {applications.map((app) => (
                  <div key={app.id} className="border rounded-lg p-4">
                    <div className="mb-3">
                      <h3 className="font-medium">{app.user.name}</h3>
                      <p className="text-sm text-gray-600">{app.job.title}</p>
                    </div>

                    <div className="flex justify-between items-center mb-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(app.application_stage)}`}>
                        {getStatusIcon(app.application_stage)}
                        {app.application_stage}
                      </span>
                      <span className="text-sm text-gray-500">{formatDate(app.created_at)}</span>
                    </div>

                    <button className="w-full text-blue-600 hover:text-blue-800 inline-flex items-center justify-center gap-1 py-2 border rounded-lg">
                      <Eye className="w-4 h-4" />
                      View Application
                    </button>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}