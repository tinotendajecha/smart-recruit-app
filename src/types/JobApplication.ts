import { Job } from "./Job";
import { User } from "./User";

export interface JobApplication {
    id: string;
    user_id: string;
    job_id: string;
    linkedin_Profile?: string | null;
    portfolio_website?: string | null;
    years_of_experience?: string | null;
    cover_letter?: string | null;
    resume_score?: string | null;
    linkedin_score?: string | null;
    resume_markup?: string | null;
    status: "pending" | "accepted" | "rejected" | string;
    stage: string
    appliedAt: Date;
    updatedAt: Date;
  
    // Optional: if you are including relations
    job?: Job;
    user?: User;
  }