"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Briefcase, Mail, Phone, Linkedin, Globe } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
// import { FormatDistanceToNowOptions } from "date-fns";

interface CandidateHeaderProps {
  candidate: {
    name: string;
    surname: string;
    email: string;
    github?:string,
    linkedin:string
    phone: string;
    dateApplied: Date;
    jobTitle: string;
    yearsOfExperience: string;
    portfolioWebsite?: string;
  };
}

export default function CandidateHeader({ candidate }: CandidateHeaderProps) {
  const formattedDate = formatDistanceToNow(new Date(candidate.dateApplied), { addSuffix: true });
  
  // Generate avatar initials from name
  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <Avatar className="h-20 w-20 bg-green-100 text-green-700 text-xl font-semibold">
          <span>{initials}</span>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="text-2xl font-bold truncate">{candidate.name} {candidate.surname}</h1>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 self-start sm:self-center">
              <Calendar className="mr-1 h-3 w-3" /> Applied {formattedDate}
            </Badge>
          </div>
          
          <div className="flex items-center mt-1 text-muted-foreground">
            <Briefcase className="h-4 w-4 mr-1" />
            <p>{candidate.jobTitle} • {candidate.yearsOfExperience} years of experience</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <a href={`mailto:${candidate.email}`} className="text-sm hover:underline truncate">
                {candidate.email}
              </a>
            </div>
            
           
             {candidate.phone && (
               <div className="flex items-center">
               <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <a href={`tel:${candidate.phone}`} className="text-sm hover:underline truncate">
                {candidate.phone}
              </a>
              </div>
             )}
            
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          {candidate.linkedin && (
            <Button variant="outline" className="flex-1" asChild>
              <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </a>
            </Button>
          )}
          
          {candidate.portfolioWebsite && (
            <Button variant="outline" className="flex-1" asChild>
              <a href={candidate.portfolioWebsite} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4 mr-2" />
                Portfolio
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}