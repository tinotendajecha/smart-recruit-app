'use client';

import { useState } from 'react';
import { 
  Briefcase, 
  Building, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  ChevronRight,
  Eye,
  Save,
  Upload
} from 'lucide-react';

export default function CreateJobPage() {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    type: '',
    location: '',
    deadline: '',
    responsibilities: '',
    requirements: '',
    preferredQualifications: '',
    salaryMin: '',
    salaryMax: '',
    benefits: '',
    assessmentLink: '',
    openings: '',
    visibility: 'public'
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500">
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Jobs</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900">Create New Job</span>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-2">Create Job Post</h1>
        <p className="text-gray-500 mb-6">Fill in the details below to add a new job to the system.</p>


        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Details Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-gray-500" />
              Basic Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select Department</option>
                  <option value="engineering">Engineering</option>
                  <option value="design">Design</option>
                  <option value="product">Product</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employment Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select Type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., Remote, New York, London"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Job Description Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Job Description</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Responsibilities
                </label>
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="List the key responsibilities..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requirements
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="List the job requirements..."
                />
              </div>
            </div>
          </div>

          {/* Compensation Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gray-500" />
              Compensation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary Range
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="salaryMin"
                      value={formData.salaryMin}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Min"
                    />
                  </div>
                  <span className="text-gray-500">to</span>
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="salaryMax"
                      value={formData.salaryMax}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Benefits
                </label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Medical, Remote Work, 401k..."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 inline-flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Draft
            </button>
            <button
              type="button"
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 inline-flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Preview
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 inline-flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Publish Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}