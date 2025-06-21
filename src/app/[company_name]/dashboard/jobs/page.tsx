"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  Plus,
  Eye,
  Edit,
  Trash2,
  Building,
  MapPin,
  Clock,
  DollarSign,
  ChevronRight,
  Search,
  Filter,
  ChevronLeft,
  ChevronDown,
  X,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Job } from "@/types/Job";
import { Loading, LoadingDots, LoadingBar } from "@/components/ui/loading";

export default function JobsPage() {
  const { company_name } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    department: "",
    location: "",
    status: "",
    type: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [jobsPerPageCount, setJobsPerPageCount] = useState<number>(5);
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
      // Fetch company jobs from API based on company_name
      const fetchCompanyData = async () => {
        const response = await fetch(`/api/company/get-company-by-name/${company_name}`);
  
        if (!response.ok) {
          console.error('Failed to fetch company data');
          return;
        }
  
        const data = await response.json();
  
        // setCompanyData(data.data);
  
        console.log('Company Data:', data.data);
  
        setJobs(data.data.Job || []);
  
        if (data.error) {
          console.error(data.error);
          return;
        }
      }
      fetchCompanyData()
    }, [])


  // 

  // // Function for getting jobs
  // const getJobs = async (page:number = 1) => {
  //   try {
  //     setIsLoading(true);
  //     const response = await fetch(`/api/jobs/get-jobs?page=${page}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     interface dataResponseInterface {
  //       jobs: Job[];
  //       totalJobs: number;
  //       currentPage: number;
  //       totalPages: number;
  //       message: string;
  //     }

  //     // Set jobs
  //     const data: dataResponseInterface = await response.json();

  //     if (response.status == 200) {
  //       setJobs(data.jobs);
  //       console.log(data);
  //       // set Jobs count
  //       setJobsPerPageCount(data.jobs.length);

  //       // Set current page
  //       setCurrentPage(data.currentPage);

  //       // Set total Jobs
  //       setTotalJobs(data.totalJobs);


  //       // Set total pages
  //       setTotalPages(data.totalPages);

  //       // set is loading to false
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Get jobs when page number changes
  // useEffect(() => {
  //   getJobs(currentPage);
  // }, [currentPage])

  // Get jobs when page loads
  // useEffect(() => {
  //   getJobs();
  // }, []);

  // Get Jobs when page number changes

  const departments = [
    "Engineering",
    "Product",
    "Design",
    "Marketing",
    "Sales",
  ];
  const locations = ["Remote", "New York", "London", "Berlin", "Tokyo"];
  const statuses = ["Active", "Archived", "Draft"];
  const types = ["Full-time", "Part-time", "Contract", "Internship"];

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({
      department: "",
      location: "",
      status: "",
      type: "",
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  const refreshJobs = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500">
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900">Jobs</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold">Jobs Management</h1>
          <div className="flex gap-2">
            <button
              onClick={refreshJobs}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
              disabled={isLoading}
            >
              <RefreshCw
                className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
              />
            </button>
            <Link href={`/${company_name}/dashboard/jobs/create`}>
              <button className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 inline-flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Job
              </button>
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-colors"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Department Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <select
                    value={filters.department}
                    onChange={(e) =>
                      handleFilterChange("department", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
                  >
                    <option value="">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) =>
                      handleFilterChange("location", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
                  >
                    <option value="">All Locations</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
                  >
                    <option value="">All Statuses</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange("type", e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
                  >
                    <option value="">All Types</option>
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              <div className="flex flex-wrap items-center gap-2">
                {Object.entries(filters).map(
                  ([key, value]) =>
                    value && (
                      <span
                        key={key}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {key}: {value}
                        <button
                          onClick={() => handleFilterChange(key, "")}
                          className="hover:text-green-900"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    )
                )}
                {(Object.values(filters).some(Boolean) || searchTerm) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loading text="Loading jobs..." size="small" />
            </div>
          ) : (
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
                {jobs &&
                  jobs.map((job, index) => (
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
          )}
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {jobs &&
            jobs.map((job, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
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
                    {/* {job.details.posted}
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  {job.details.salary} */}
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

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <div className="flex items-center text-sm text-gray-500">
            <span>
              Showing {(currentPage - 1) * jobsPerPageCount + 1} -{" "}
              {Math.min(currentPage * jobsPerPageCount, totalJobs)} of{" "}
              {totalPages} pages
            </span>
          </div>

          <div className="flex items-center gap-2 mt-4">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page Number Buttons */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg ${
                      currentPage === page
                        ? "bg-green-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
