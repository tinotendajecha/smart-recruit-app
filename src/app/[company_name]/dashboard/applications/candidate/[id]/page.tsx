"use client";

import { useEffect, useState } from "react";
import CandidateHeader from "@/components/applications/CandidateHeader";
import ApplicationStatus from "@/components/applications/ApplicationStatus";
import ApplicationDetails from "@/components/applications/ApplicationDetails";
import ScoreSection from "@/components/applications/ScoreSection";
import ResumeViewer from "@/components/applications/ResumeViewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { JobApplication } from "@/types/JobApplication";
import StatusUpdateDropdown from "@/components/applications/StatusUpdateDropDown";
import { useRouter } from "next/navigation";
import { toast} from 'react-toastify'
import { useParams } from "next/navigation";

export default function CandidateApplicationPage() {
  const params = useParams();
  const jobApplicationId = params.id as string;
  const [candidate, setCandidate] = useState<JobApplication | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [applicationStatus, setApplicationStatus] = useState<string>(candidate?.stage || "Applied");

  const router = useRouter();

  const company_name = params.company_name

  // Fetch job application data based on candidateId
  useEffect(() => {
    async function fetchCandidateData() {
      try {
        const response = await fetch(`/api/job-application/get/${jobApplicationId}`);

        if (response.ok) {
          const data = await response.json();

          console.log(data)
          setCandidate(data.application);
          setIsLoading(false)
        }
      } catch (error) {
        console.log("Error fetching candidate data:", error);
      }
    }
    fetchCandidateData()
  }, [])

  const onUpdateStatus = async () => {
    try {
      // Make API call to update the application status
      
      // Create the API
      const response = await fetch('/api/job-application/update-stage', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        applicationID: jobApplicationId, // or whatever ID you're passing
        stage: applicationStatus, // your selected dropdown value
      }),
    });

    const result = await response.json();

    if (response.ok){
      toast.success("Application status updated successfully!");
      router.push(`/${company_name}/dashboard/applications`)
    } 
    } catch (error) {
      console.log(error)
    }
  }


  if (isLoading || !candidate) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <CandidateHeader candidate={{
        ...candidate.user!,
        github: candidate.user!.github ?? undefined,
        linkedin: candidate.linkedin_Profile ?? "",
        phone: candidate.user!.phone ?? "",
        dateApplied: candidate.appliedAt,
        jobTitle: candidate.job?.title ?? "",
        yearsOfExperience: candidate.years_of_experience ?? "",
        portfolioWebsite: candidate.portfolio_website ?? "",
      }} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Application Details</TabsTrigger>
              <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4">
              <ApplicationDetails candidate={{
                ...candidate.user!,
                jobTitle: candidate.job?.title ?? "",
                yearsOfExperience: candidate.years_of_experience ?? "",
                linkedInProfile: candidate.linkedin_Profile ?? "",
                portfolioWebsite: candidate.portfolio_website ?? "",
                dateApplied: candidate.appliedAt,
              }} />
            </TabsContent>
            <TabsContent value="cover-letter" className="mt-4">
              <div className="bg-white rounded-lg shadow-sm p-6 whitespace-pre-line">
                {candidate.cover_letter || "No cover letter provided."}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <ApplicationStatus
            stage={candidate.stage}
            status={candidate.status}
          />

          <ScoreSection
            resumeScore={
              typeof candidate.resume_score === "number"
                ? candidate.resume_score
                : typeof candidate.resume_score === "string"
                  ? Number(candidate.resume_score)
                  : undefined
            }
            linkedInScore={
              typeof candidate.linkedin_score === "number"
                ? candidate.linkedin_score
                : typeof candidate.linkedin_score === "string"
                  ? Number(candidate.linkedin_score)
                  : undefined
            }
          />

          {/* <ResumeViewer resumeUrl={candidate} /> */}
        </div>
      </div>
      <div className="mt-5">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h3>
          <div className="relative">
            <select
            
              value={applicationStatus}
              onChange={(e) => {
                setApplicationStatus(e.target.value);
              }}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium text-gray-900 cursor-pointer hover:border-gray-300"
            >
              <option value="Applied">Applied</option>
              <option value="Screening">Screening</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Hired">Hired</option>
            </select>
          </div>
          <div>
            <button 
            onClick={onUpdateStatus}
            className="w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 bg-green-500 text-white mt-2">Update Status</button>
          </div>
        </div>

      </div>
    </div>
  );
}