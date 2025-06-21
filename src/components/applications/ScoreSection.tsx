"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Linkedin } from "lucide-react";

interface ScoreSectionProps {
  resumeScore?: number;
  linkedInScore?: number;
}

export default function ScoreSection({ resumeScore, linkedInScore }: ScoreSectionProps) {
  if (!resumeScore && !linkedInScore) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Candidate Scores</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {resumeScore !== undefined && (
          <ScoreItem 
            label="Resume Score" 
            score={resumeScore} 
            icon={<FileText className="h-4 w-4" />} 
          />
        )}
        
        {linkedInScore !== undefined && (
          <ScoreItem 
            label="LinkedIn Score" 
            score={linkedInScore} 
            icon={<Linkedin className="h-4 w-4" />} 
          />
        )}
        
        <div className="text-xs text-muted-foreground mt-2">
          Scores are calculated based on keyword matching and profile completeness.
        </div>
      </CardContent>
    </Card>
  );
}

function ScoreItem({ label, score, icon }: { label: string; score: number; icon: React.ReactNode }) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-700";
    if (score >= 60) return "text-yellow-700";
    return "text-red-700";
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          {icon}
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className={`text-sm font-bold ${getScoreColor(score)}`}>
          {score}%
        </span>
      </div>
      <Progress 
        value={score} 
        className={`h-2 ${getProgressColor(score)}`}
      />
    </div>
  );
}