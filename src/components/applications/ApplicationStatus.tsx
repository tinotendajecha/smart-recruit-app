"use client";

import { CheckCircle2, Clock, AlertCircle, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ApplicationStage = "Applied" | "Screening" | "Interview" | "Offer" | "Hired";
type ApplicationStatus = "pending" | "accepted" | "rejected";

interface ApplicationStatusProps {
  stage: string;
  status: string;
}

export default function ApplicationStatus({ stage, status }: ApplicationStatusProps) {
  
  console.log(stage)
  console.log(status)
  
  const stages: ApplicationStage[] = ["Applied", "Screening", "Interview", "Offer", "Hired"];
  const currentStageIndex = stages.indexOf(stage as ApplicationStage);
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "accepted":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <CircleDot className="h-5 w-5 text-gray-400" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          Application Status
          <span className={cn(
            "text-sm px-2 py-1 rounded-full font-normal flex",
            getStatusColor(status)
          )}>
            {getStatusIcon(status)}
            <span className="ml-1">{getStatusText(status)}</span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {stages.map((stageName, index) => {
            const isActive = index <= currentStageIndex;
            const isCurrent = index === currentStageIndex;
            
            return (
              <div key={stageName} className="relative flex items-center mb-4 last:mb-0">
                <div className={cn(
                  "w-6 h-6 rounded-full z-10 flex items-center justify-center transition-all duration-300",
                  isActive ? "bg-green-500" : "bg-gray-200"
                )}>
                  {isActive && <CheckCircle2 className="h-4 w-4 text-white" />}
                </div>
                
                <div className="ml-4">
                  <h3 className={cn(
                    "font-medium capitalize transition-colors",
                    isActive ? "text-green-700" : "text-gray-500"
                  )}>
                    {stageName}
                  </h3>
                  
                  {isCurrent && (
                    <p className="text-sm text-muted-foreground">Current stage</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}