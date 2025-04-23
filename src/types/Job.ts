export interface Job {
    id: string;
    title: string;
    department: string;
    employment_type: string;
    location: string;
    description: string;
    description_list: string[];
    requirements: string;
    requirements_list: string[];
    compensation_minimum: string;
    compensation_maximum: string;
    benefits_desc: string;
    benefits_list: string[];
    status: string;
    company_id? : string;
    createdAt: Date;
    updatedAt: Date;
  }