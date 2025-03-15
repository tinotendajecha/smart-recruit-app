export interface Company {
    id: string;
    company_name: string;
    organization_size: string;
    country: string;
    city: string;
    services_provided: string;
    company_website: string;
    
    // Optional fields
    about_company?: string | null;
    founded?: string | null;
    linkedin?: string | null;
    Twitter?: string | null;
    Facebook?: string | null;
    company_culture?: string | null;
    benefits_and_perks: string[];
    email?: string | null;
    phone?: string | null;
    Address?: string | null;
    featured? : boolean | null
    short_description?: string | null;
    // Relations
    createdAt?: string;
    updatedAt?: string;
  }
  