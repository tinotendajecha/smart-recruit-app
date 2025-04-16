"use client";

import { useEffect, useState } from "react";
import {
  Building,
  MapPin,
  Users,
  Globe,
  Briefcase,
  Calendar,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  Mail,
  Phone,
  Clock,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Company } from "@/types/Company";
import { Job } from "@/types/Job";

export default function CompanyDetailsPage() {
  const [companiesData, setCompaniesData] = useState<Company[]>([]);
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const { id } = useParams();

  const getRandomColor = () => {
    const colors = [
      "4CAF50", // Medium Green
      "388E3C", // Darker Green
      "2E7D32", // Deep Green
      "1B5E20", // Forest Green
      "66BB6A", // Light Green
      "FF9800", // Orange
      "F44336", // Red
      "03A9F4", // Sky Blue
      "9C27B0", // Purple
      "FFEB3B", // Yellow
      "FF5722", // Deep Orange
      "00BCD4", // Cyan
      "8BC34A", // Light Olive Green
      "607D8B", // Muted Blue-Gray
      "795548", // Warm Brown
    ];
    // Shades of green
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    try {
      fetch("/api/company/get-companies")
        .then((res) => res.json())
        .then((data) => {
          setCompaniesData(data.companies);
          // setFilteredCompanies(data.companies);
        })
        .catch((error) => console.error("Error fetching companies:", error));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      fetch(`/api/jobs/get-jobs?companyId=${id}`)
        .then((res: Response) => res.json())
        .then((data: { jobs: Job[] }) => {
          setJobsData(data.jobs);
          console.log(data.jobs);
        })
        .catch((error: Error) => console.error("Error fetching jobs:", error));
    } catch (error) {
      console.log(error);
    }
  }, []);

  // const companyId = parseInt(id as string);

  // Find the company by ID
  const company = companiesData.find((c) => c.id === id);

  const socialMediaLinks = company
    ? {
        LinkedIn: company.linkedin,
        Twitter: company.Twitter,
        Facebook: company.Facebook,
      }
    : {};

  // Find jobs for this company
  const companyJobs = jobsData;

  // Tab state
  const [activeTab, setActiveTab] = useState("about");

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <Building className="w-16 h-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Company Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The company you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/companies"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Back to Companies
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link
            href="/candidate/dashboard/companies"
            className="flex items-center hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Companies
          </Link>
        </div>

        {/* Company Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <img
                src={`https://ui-avatars.com/api/?name=${
                  company.company_name
                }&background=${getRandomColor()}&color=ffffff&rounded=true&size=128`}
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {company.company_name
                        .replaceAll("-", " ") // Replace hyphens with spaces if needed
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </h1>
                    <p className="text-gray-600 mt-1">
                      {company.short_description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {company.city}, {company.country}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {company.organization_size}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Founded {company.founded}
                      </div>
                    </div>
                  </div>
                  <a
                    href={company.company_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 whitespace-nowrap"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === "about"
                    ? "border-b-2 border-green-600 text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("about")}
              >
                About
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === "jobs"
                    ? "border-b-2 border-green-600 text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("jobs")}
              >
                Jobs ({companyJobs.length})
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === "culture"
                    ? "border-b-2 border-green-600 text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("culture")}
              >
                Culture & Benefits
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === "contact"
                    ? "border-b-2 border-green-600 text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("contact")}
              >
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          {/* About Tab */}
          {activeTab === "about" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                About{" "}
                {company.company_name
                  .replaceAll("-", " ") // Replace hyphens with spaces if needed
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {company.about_company}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Company Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Briefcase className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Industry</p>
                        <p className="text-gray-600">
                          {company.services_provided}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Company Size</p>
                        <p className="text-gray-600">
                          {company.organization_size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Founded</p>
                        <p className="text-gray-600">{company.founded}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Headquarters</p>
                        <p className="text-gray-600">
                          {company.city}, {company.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Social Media
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(socialMediaLinks)
                      .filter(([_, url]) => url) // Only include non-null/non-empty links
                      .map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-green-600 hover:text-green-700"
                        >
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <ExternalLink className="w-4 h-4" />
                          </div>
                          <span className="capitalize">{platform}</span>
                        </a>
                      ))}
                  </div>
                  ;
                </div>
              </div>
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === "jobs" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Open Positions at{" "}
                  {company.company_name
                    .replaceAll("-", " ") // Replace hyphens with spaces if needed
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </h2>
                <Link
                  href={`/${company.company_name.toLowerCase()}/openings`}
                  className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {companyJobs.length > 0 ? (
                <div className="space-y-4">
                  {companyJobs.map((job) => (
                    <div
                      key={job.id}
                      className="border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                              {job.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Building className="w-4 h-4" />
                                {job.department.charAt(0).toUpperCase() +
                                  job.department.slice(1)}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {job.location}
                              </div>
                              {/* <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                Posted {job.createdAt.toLocaleDateString()}
                              </div> */}
                            </div>
                          </div>
                          <Link
                            href={`/candidate/openings/apply/${
                              job.id
                            }`}
                            className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
                          >
                            Apply Now
                          </Link>
                        </div>

                        <div className="mt-4">
                          <p className="text-gray-600 text-sm sm:text-base line-clamp-2">
                            {job.description}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm bg-green-100 text-green-800">
                            {/* {job.type} */}
                            Job Type
                          </span>
                          <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                            <DollarSign className="w-4 h-4" />$
                            {job.compensation_minimum} - $
                            {job.compensation_maximum}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No open positions
                  </h3>
                  <p className="text-gray-600">
                    {company.company_name
                      .replaceAll("-", " ") // Replace hyphens with spaces if needed
                      .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
                    doesn't have any open positions at the moment.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Culture & Benefits Tab */}
          {activeTab === "culture" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Culture & Benefits
              </h2>

              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Company Culture
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {company.company_culture}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Benefits & Perks
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {company.benefits_and_perks.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700">
                        {benefit.charAt(0).toUpperCase() +
                          benefit.slice(1).toLowerCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Get in Touch
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a
                          href={`mailto:${company.email}`}
                          className="text-green-600 hover:underline"
                        >
                          {company.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a
                          href={`tel:${company.phone}`}
                          className="text-green-600 hover:underline"
                        >
                          {company.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-gray-600">{company.Address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Send a Message
                  </h3>

                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter your message"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
