'use client';

import { 
  Briefcase, 
  Building, 
  MapPin, 
  Clock, 
  Search,
  DollarSign,
  Filter,
  ChevronRight
} from 'lucide-react';

// This would be fetched from your API based on the company
const companyData = {
  name: 'Yirifi',
  logo: 'https://ui-avatars.com/api/?name=Yirifi&background=0A5C36&color=fff',
  description: 'Building the future of African technology',
  location: 'Harare, Zimbabwe',
  website: 'https://yirifi.com'
};

// Mock jobs data - would come from your API
const jobs = [
  {
    id: 1,
    title: 'Senior Developer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    salary: { min: 120000, max: 150000 },
    postedDate: '2 days ago',
    description: 'We are looking for an experienced developer to join our team...'
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    type: 'Full-time',
    location: 'Harare',
    salary: { min: 130000, max: 160000 },
    postedDate: '1 week ago',
    description: 'Seeking a product manager to lead our product initiatives...'
  },
];

export default function CompanyOpeningsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Company Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <img
              src={companyData.logo}
              alt={companyData.name}
              className="w-16 h-16 rounded-lg"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{companyData.name}</h1>
              <p className="text-gray-500 mt-1">{companyData.description}</p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {companyData.location}
                </div>
                <a 
                  href={companyData.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700"
                >
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <select className="w-full sm:w-auto px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Product</option>
                <option>Design</option>
              </select>
              <select className="w-full sm:w-auto px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option>All Locations</option>
                <option>Remote</option>
                <option>Harare</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:space-y-6">
          {jobs.map((job) => (
            <div 
              key={job.id}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {job.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {job.department}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Posted {job.postedDate}
                      </div>
                    </div>
                  </div>
                  <button 
                    className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
                    onClick={() => window.location.href = `/yirifi/openings/${job.id}/apply`}
                  >
                    Apply Now
                  </button>
                </div>

                <div className="mt-4">
                  <p className="text-gray-600 text-sm sm:text-base line-clamp-2">{job.description}</p>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm bg-green-100 text-green-800">
                    {job.type}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}