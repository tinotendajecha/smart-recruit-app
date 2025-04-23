"use client";

import { useState } from "react";
import {
  ChevronRight,
  Upload,
  Building,
  MapPin,
  Clock,
  DollarSign,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Job } from "@/types/Job";
import { Loading } from "@/components/ui/loading";
import getRandomColor from "@/utils/getRandomColor";
import { useUserStore } from "@/zustand/userDataStore";
import { useRouter } from "next/navigation";
import {toast} from 'react-toastify'

// This would come from your API based on the job ID

export default function JobApplicationPage() {
  const { id } = useParams();
  const [jobData, setJobData] = useState<Job>({} as Job);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  // Get user id from zustand store
  const user = useUserStore((state) => state.user);
  const userId = user.id;

  useEffect(() => {
    // Trigger loading when state changes
  }, [analyzing, saving])

  useEffect(() => {
    // console.log("Updated Job Data:", jobData);
  }, [jobData]);

  // Fetch job data based on ID (if needed)
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(`/api/jobs/get-job-by-id?id=${id}`);
        const data = await response.json();

        // console.log("Job Data:", data.job);
        setJobData(data.job);

        // console.log("Job Data:", jobData)
        // console.log("Job Data:", jobData);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    fetchJobData();
  }, []);

  const [formData, setFormData] = useState<{
    linkedin: string;
    portfolio: string;
    experience: string;
    coverLetter: string;
    resume: File | null;
  }>({
    linkedin: "",
    portfolio: "",
    experience: "",
    coverLetter: "",
    resume: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;
    if (file) {
      setFormData((prev) => ({
        ...prev,
        resume: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission

    // Step 1 : Pass resume along with the job description data
    async function analyseResume() {
      setAnalyzing(true)

      const formDataToSend = new FormData();

      if (formData.resume) {
        formDataToSend.append("data", formData.resume);
      }
      
      // Append additional job descriptions
      formDataToSend.append("jobData", JSON.stringify(jobData || {}));

      try {
        const res = await fetch(
          "https://wombat-hip-poodle.ngrok-free.app/webhook-test/apply-job",
          {
            method: "POST",
            body: formDataToSend,
          }
        );

        const data = await res.json();

        setAnalyzing(false)
        return data
      } catch (error) {
        console.error("❌ Upload failed:", error);
      }
    }

    // Call the function to analyze the resume
    setSaving(true)

    interface ResumeData{
      data: {
        resume_text: string;
        resume_score: number;
      }
    }

    const resumeData:ResumeData = await analyseResume();

    // if (resumeData) {
    //   console.log(resumeData)
    // }
    
    // console.log("Company Id: " + jobData?.company_id)

    // console.log("Resume score "+ resumeData.data.score)

    // Step 2 : Save the application data to the database
    const data = {
      userId: user.id,
      jobId: jobData?.id,
      linkedinProfile: formData.linkedin,
      portfolioWebsite: formData.portfolio,
      yearsOfExperience: formData.experience,
      coverLetter: formData.coverLetter,
      resumeMarkup: resumeData.data.resume_text,
      resumeScore: resumeData.data.resume_score,
      linkedinScore: 80,
      companyId: jobData?.company_id,
    };

    // Make the request
    const response = await fetch("/api/job-application/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jobApplicationData = await response.json();
    // console.log(jobApplicationData)

    if(response.ok){
      setSaving(false)
      router.push('/candidate/dashboard/companies')
      toast.success("Application submitted successfully! 🎉")
    }

  };

  if(loading){
    return(
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loading text="Loading Job Data..." />
      </div>
    )
  }

  if(analyzing){
    return(
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loading text="Analyzing resume🔥..." />
      </div>
    )
  }

  if(saving){
    return(
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loading text="Saving to db✅..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href={`/candidate/dashboard/companies`}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Jobs
        </Link>

        {/* Job Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <img
              src={`https://ui-avatars.com/api/?name=${
                jobData?.title
              }&background=${getRandomColor()}&color=ffffff&rounded=true&size=128`}
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {jobData?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  {jobData?.company_id}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {jobData?.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Posted {jobData?.createdAt ? new Date(jobData.createdAt).toLocaleDateString() : "N/A"}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />$
                  {jobData?.compensation_minimum} - $
                  {jobData?.compensation_maximum}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Application Form</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Professional Links */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Professional Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Portfolio Website
                  </label>
                  <input
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience *
              </label>
              <select
                name="experience"
                required
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select experience</option>
                <option value="0-2">0-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Letter
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Tell us why you're interested in this position..."
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resume/CV *
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-green-600 hover:text-green-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        name="resume"
                        required
                        onChange={handleFileChange}
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX up to 10MB
                  </p>
                  {formData.resume && (
                    <p className="text-sm text-green-600">
                      Selected file: {formData.resume?.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
