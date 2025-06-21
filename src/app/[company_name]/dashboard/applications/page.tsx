"use client";
import { useEffect, useState, useMemo } from "react";
import {
  FileText,
  Linkedin,
  ChevronRight,
  BarChart3,
  User,
  Building,
  Search,
  ChevronLeft,
  ChevronDown,
  Info,
} from "lucide-react";
import { JobApplication } from "@/types/JobApplication";
import { useUserStore } from "@/zustand/userDataStore";
import { LoadingDots } from "@/components/ui/loading";
import { Loading } from "@/components/ui/loading";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const user = useUserStore((state) => state.user);
  const company_id = user.Company_User[0]?.company_id; // Assuming the first entry is the relevant one
  const {company_name} = useParams()

  console.log(company_name)

  const [isLoading, setIsLoading] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState("All Jobs");
  const [selectedStage, setSelectedStage] = useState("All Stages");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/job-application/by-company?company_id=${company_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        console.log(data);

        // Check if the response is ok and contains applications
        if (response.ok) {
          setApplications(data.applications);
          setIsLoading(false);
        } else {
          console.error("Error fetching applications:", data.message);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  // Get unique job titles for filter dropdown
  const uniqueJobs = useMemo(() => {
    const jobs = applications.map(app => app.job?.title).filter(Boolean);
    return [...new Set(jobs)];
  }, [applications]);

  // Get unique stages for filter dropdown
  const uniqueStages = useMemo(() => {
    const stages = applications.map(app => app.stage).filter(Boolean);
    return [...new Set(stages)];
  }, [applications]);

  // Filter applications based on search term, job, and stage
  const filteredApplications = useMemo(() => {
    return applications.filter(application => {
      // Search filter
      const matchesSearch = searchTerm === "" || 
        `${application.user?.name} ${application.user?.surname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.job?.title?.toLowerCase().includes(searchTerm.toLowerCase());

      // Job filter
      const matchesJob = selectedJob === "All Jobs" || application.job?.title === selectedJob;

      // Stage filter
      const matchesStage = selectedStage === "All Stages" || application.stage === selectedStage;

      return matchesSearch && matchesJob && matchesStage;
    });
  }, [applications, searchTerm, selectedJob, selectedStage]);

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-gray-500">
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900">Applications</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold">Applications</h1>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        {/* Enhanced Filters - Responsive */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex items-center border rounded-lg px-3 py-2 w-full sm:w-48 hover:border-gray-400 transition-colors">
            <Building className="w-4 h-4 mr-2 text-gray-500" />
            <select 
              className="appearance-none bg-transparent focus:outline-none w-full pr-8"
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
            >
              <option>All Jobs</option>
              {uniqueJobs.map(job => (
                <option key={job} value={job}>{job}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3" />
          </div>
          <div className="relative flex items-center border rounded-lg px-3 py-2 w-full sm:w-48 hover:border-gray-400 transition-colors">
            <BarChart3 className="w-4 h-4 mr-2 text-gray-500" />
            <select 
              className="appearance-none bg-transparent focus:outline-none w-full pr-8"
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
            >
              <option>All Stages</option>
               <option value="Applied">Applied</option>
               <option value="Screening">Screening</option>
                <option value="Interview">Interview</option>
                 <option value="Offer">Offer</option>
               <option value="Hired">Hired</option>
              {/* {uniqueStages.map(stage => (
                <option key={stage} value={stage}>{stage}</option>
              ))} */}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3" />
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-500 text-lg">Loading applications...</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Candidate
                      </div>
                    </th>
                    <th className="pb-3">Position</th>
                    <th className="pb-3">Stage</th>
                    <th className="pb-3">Resume</th>
                    <th className="pb-3">Linkedin</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredApplications.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8">
                        <p className="text-gray-500">
                          {applications.length === 0 ? "No applications yet!" : "No applications match your filters."}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.map((application, index) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                              <User className="w-4 h-4 text-gray-600" />
                            </div>
                            {application.user?.name} {application.user?.surname}
                          </div>
                        </td>
                        <td className="py-4">{application.job?.title}</td>
                        <td className="py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${application.stage === "Interview"
                                ? "bg-blue-100 text-blue-800"
                                : application.stage === "Screening"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                          >
                            {application.stage}
                          </span>
                        </td>

                        <td className="py-4">
                          <span
                            className={`font-semibold ${Number(application.resume_score ?? 0) >= 90
                                ? "text-green-600"
                                : Number(application.resume_score ?? 0) >= 80
                                  ? "text-blue-600"
                                  : "text-yellow-600"
                              }`}
                          >
                            {application.resume_score}%
                          </span>
                        </td>
                        <td className="py-4">
                          <span
                            className={`font-semibold ${Number(application.linkedin_score ?? 0) >= 90
                                ? "text-green-600"
                                : Number(application.linkedin_score ?? 0) >= 80
                                  ? "text-blue-600"
                                  : "text-yellow-600"
                              }`}
                          >
                            {application.linkedin_score}%
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <button className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              Resume
                            </button>
                            <Link href={`/${company_name}/dashboard/applications/candidate/${application.id}`}>
                              <button className="text-purple-600 hover:text-blue-800 inline-flex items-center gap-1">
                                <Info className="w-4 h-4" />
                                Hire
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {filteredApplications.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    {applications.length === 0 ? "No applications yet!" : "No applications match your filters."}
                  </p>
                </div>
              ) : (
                filteredApplications.map((application, index) => (
                  <div
                    key={index}
                    className="bg-white border rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{application.user?.name} {application.user?.surname}</h3>
                          <p className="text-sm text-gray-600">
                            {application.job?.title}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${application.stage === "Interview"
                            ? "bg-blue-100 text-blue-800"
                            : application.stage === "Screening"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {application.stage}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-t border-b">
                      <span className="text-sm text-gray-600">Resume</span>
                      <span
                        className={`font-semibold ${Number(application.resume_score ?? 0) >= 90
                            ? "text-green-600"
                            : Number(application.resume_score ?? 0) >= 80
                              ? "text-blue-600"
                              : "text-yellow-600"
                          }`}
                      >
                        {application.resume_score}%
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 text-blue-600 hover:text-blue-800 inline-flex items-center justify-center gap-1 py-2">
                        <FileText className="w-4 h-4" />
                        Resume
                      </button>
                      <Link href={`/${company_name}/dashboard/applications/candidate/${application.id}`}>
                        <button className="flex-1 text-purple-600 hover:text-purple-800 inline-flex items-center justify-center gap-1 py-2">
                          <Info className="w-4 h-4" />
                          View
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Showing {filteredApplications.length} of {applications.length} results
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="inline-flex items-center justify-center w-8 h-8 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="inline-flex items-center justify-center w-8 h-8 border rounded-lg bg-blue-50 text-blue-600 font-medium">
                  1
                </button>
                <button className="inline-flex items-center justify-center w-8 h-8 border rounded-lg hover:bg-gray-50">
                  2
                </button>
                <button className="inline-flex items-center justify-center w-8 h-8 border rounded-lg hover:bg-gray-50">
                  3
                </button>
                <button className="inline-flex items-center justify-center w-8 h-8 border rounded-lg hover:bg-gray-50">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}