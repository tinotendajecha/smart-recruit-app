'use client';

import { useEffect, useState } from 'react';
import { ChevronRight, UserPlus, Edit2, Trash2, Users, Briefcase, Clock, Search, Filter, MoreVertical, ChevronLeft, User, FileText, Info } from 'lucide-react';

interface JobApplicationResponse {
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
  company_id?: string | null;
  stage?: string | null;
  status: string;
  appliedAt: string;
  updatedAt: string;

  user: {
    id: string;
    name: string;
    email: string;
  };

  job: {
    id: string;
    title: string;
    description: string;
  };
}

export default function TeamPage() {
  const [hiredCandidates, setHiredCandidates] = useState<JobApplicationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHiredCandidates = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/job-application/get-by-application-stage/Hired', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setHiredCandidates(data.applications);
        } else {
          console.error('Error fetching hired candidates:', data.error);
        }
      } catch (error) {
        console.error('Error fetching hired candidates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHiredCandidates();
  }, []);

  // Filter candidates based on search term
  const filteredCandidates = hiredCandidates.filter(candidate =>
    candidate.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-gray-500">
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900">Team</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Hired Team Members</h1>
            <p className="text-sm text-gray-500 mt-1">Successfully hired candidates who are now part of your team</p>
          </div>
          <button className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
            <UserPlus className="w-4 h-4" />
            Add Team Member
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-green-600" />
              <span className="text-gray-600">Total Hired</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{hiredCandidates.length}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <span className="text-gray-600">Unique Positions</span>
            </div>
            <p className="text-2xl font-semibold mt-2">
              {new Set(hiredCandidates.map(candidate => candidate.job.title)).size}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-purple-600" />
              <span className="text-gray-600">This Month</span>
            </div>
            <p className="text-2xl font-semibold mt-2">
              {hiredCandidates.filter(candidate => {
                const hiredDate = new Date(candidate.updatedAt);
                const currentMonth = new Date().getMonth();
                return hiredDate.getMonth() === currentMonth;
              }).length}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-500 text-lg">Loading hired candidates...</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Name
                      </div>
                    </th>
                    <th className="pb-3">Position</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Experience</th>
                    <th className="pb-3">Hired Date</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8">
                        <p className="text-gray-500">
                          {hiredCandidates.length === 0 ? "No hired candidates yet!" : "No candidates match your search."}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredCandidates.map((candidate, index) => (
                      <tr key={candidate.id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                        <td className="py-4">
                          <div className="flex items-center">
                            <img
                              src={`https://ui-avatars.com/api/?name=${candidate.user.name.replace(' ', '+')}&background=e5e7eb&color=4b5563`}
                              alt={candidate.user.name}
                              className="w-8 h-8 rounded-full mr-3"
                            />
                            <div>
                              <div className="font-medium">{candidate.user.name}</div>
                              <div className="text-sm text-gray-500">ID: {candidate.user.id.slice(0, 8)}...</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                            {candidate.job.title}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className="text-gray-600">{candidate.user.email}</span>
                        </td>
                        <td className="py-4">
                          <span className="font-medium">
                            {candidate.years_of_experience || 'N/A'} years
                          </span>
                        </td>
                        <td className="py-4">
                          <span className="text-gray-600">
                            {new Date(candidate.updatedAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            {candidate.portfolio_website && (
                              <a 
                                href={candidate.portfolio_website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <FileText className="w-4 h-4" />
                              </a>
                            )}
                            {candidate.linkedin_Profile && (
                              <a 
                                href={candidate.linkedin_Profile} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Info className="w-4 h-4" />
                              </a>
                            )}
                            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {filteredCandidates.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    {hiredCandidates.length === 0 ? "No hired candidates yet!" : "No candidates match your search."}
                  </p>
                </div>
              ) : (
                filteredCandidates.map((candidate, index) => (
                  <div key={candidate.id} className="bg-white border rounded-lg p-4 space-y-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://ui-avatars.com/api/?name=${candidate.user.name.replace(' ', '+')}&background=e5e7eb&color=4b5563`}
                          alt={candidate.user.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-medium">{candidate.user.name}</h3>
                          <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm mt-1">
                            {candidate.job.title}
                          </span>
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-2 border-t border-b">
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium mt-1 text-sm">{candidate.user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Experience</p>
                        <p className="font-medium mt-1">{candidate.years_of_experience || 'N/A'} years</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Hired Date</p>
                        <p className="font-medium mt-1">{new Date(candidate.updatedAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Resume Score</p>
                        <p className={`font-medium mt-1 ${
                          Number(candidate.resume_score ?? 0) >= 90 ? 'text-green-600' :
                          Number(candidate.resume_score ?? 0) >= 80 ? 'text-blue-600' : 'text-yellow-600'
                        }`}>
                          {candidate.resume_score || 'N/A'}%
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {candidate.portfolio_website && (
                        <a 
                          href={candidate.portfolio_website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 text-blue-600 hover:bg-blue-50 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <FileText className="w-4 h-4" />
                          Portfolio
                        </a>
                      )}
                      {candidate.linkedin_Profile && (
                        <a 
                          href={candidate.linkedin_Profile} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 text-blue-600 hover:bg-blue-50 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Info className="w-4 h-4" />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-6">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{filteredCandidates.length}</span> of{' '}
                <span className="font-medium">{hiredCandidates.length}</span> hired candidates
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="inline-flex items-center justify-center w-9 h-9 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
                  disabled
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="inline-flex items-center justify-center w-9 h-9 border rounded-lg bg-green-50 text-green-600 font-medium">
                  1
                </button>
                <button className="inline-flex items-center justify-center w-9 h-9 border rounded-lg hover:bg-gray-50">
                  2
                </button>
                <button className="inline-flex items-center justify-center w-9 h-9 border rounded-lg hover:bg-gray-50">
                  3
                </button>
                <button className="inline-flex items-center justify-center w-9 h-9 border rounded-lg hover:bg-gray-50">
                  4
                </button>
                <button className="inline-flex items-center justify-center w-9 h-9 border rounded-lg hover:bg-gray-50">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}