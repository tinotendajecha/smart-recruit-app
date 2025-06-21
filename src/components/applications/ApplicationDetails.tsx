"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar, Clock, Award } from "lucide-react";
import { format } from "date-fns";

interface ApplicationDetailsProps {
  candidate: {
    jobTitle: string;
    yearsOfExperience: string;
    dateApplied: Date;
    linkedInProfile?: string;
    portfolioWebsite?: string;
  };
}

export default function ApplicationDetails({ candidate }: ApplicationDetailsProps) {
  const formattedDate = format(new Date(candidate.dateApplied), "MMMM d, yyyy 'at' h:mm a");

  return (
    <Card className="animate-fadeIn">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DetailItem 
            icon={<Briefcase className="h-5 w-5 text-green-600" />}
            label="Position Applied For"
            value={candidate.jobTitle}
          />
          
          {/* <DetailItem 
            icon={<Clock className="h-5 w-5 text-green-600" />}
            label="Years of Experience"
            value={`${candidate.yearsOfExperience} years`}
          /> */}
          
          <DetailItem 
            icon={<Calendar className="h-5 w-5 text-green-600" />}
            label="Date Applied"
            value={formattedDate}
          />
          
          <DetailItem 
            icon={<Award className="h-5 w-5 text-green-600" />}
            label="Qualifications"
            value="Bachelor's in Computer Science"
          />
        </div>

       {(candidate.linkedInProfile || candidate.portfolioWebsite) && (
          <div className="mt-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Online Presence</h3>
            <div className="grid grid-cols-1 gap-4">
              {candidate.linkedInProfile && (
                <DetailLink 
                  label="LinkedIn Profile" 
                  url={candidate.linkedInProfile} 
                />
              )}
              
              {candidate.portfolioWebsite && (
                <DetailLink 
                  label="Portfolio Website" 
                  url={candidate.portfolioWebsite} 
                />
              )}
            </div>
          </div>
        )} 
      </CardContent>
    </Card>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start">
      <div className="bg-green-50 rounded-full p-2 mr-3">
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium mt-1">{value}</p>
      </div>
    </div>
  );
}

function DetailLink({ label, url }: { label: string; url: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-green-600 hover:text-green-700 hover:underline font-medium break-all"
      >
        {url}
      </a>
    </div>
  );
}