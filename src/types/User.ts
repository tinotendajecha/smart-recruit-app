import { Job } from './Job';
import { Company_User } from './Company_User';

export interface User {
    id: string;
    email: string;
    name: string;
    surname: string;
    password: string;
    role: string;
    job?: Job | null;
    job_id?: string | null;
    city?: string | null;
    country?: string | null;
    profile_img_url?: string | null;
    phone?: string | null;
    bio?: string | null;
    skills?: string | null;
    linkedin?: string | null;
    github?: string | null;
    isEmailVerified?: boolean | null;
    createdAt: Date;
    updatedAt: Date;
    Company_User: Company_User[];
    // JobApplication: JobApplication[];
  }