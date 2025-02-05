'use client';

import { useState } from 'react';
import { z } from 'zod';
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
  Upload,
  X,
  Plus,
  AlertCircle
} from 'lucide-react';

// Define Zod schema for form validation
const jobFormSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  department: z.string().min(1, 'Department is required'),
  employment_type: z.string().min(1, 'Employment type is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(1, 'Description is required'),
  description_list: z.array(z.string()).min(1, 'At least one responsibility is required'),
  requirements: z.string().min(1, 'Requirements are required'),
  requirements_list: z.array(z.string()).min(1, 'At least one specific requirement is required'),
  compensation_minimum: z.string().min(1, 'Minimum compensation is required'),
  compensation_maximum: z.string().min(1, 'Maximum compensation is required'),
  benefits_desc: z.string().min(1, 'Benefits description is required'),
  benefits_list: z.array(z.string()).min(1, 'At least one benefit is required'),
  status: z.enum(['draft', 'published'])
}).refine((data) => {
  const min = Number(data.compensation_minimum);
  const max = Number(data.compensation_maximum);
  return min <= max;
}, {
  message: "Maximum compensation must be greater than or equal to minimum compensation",
  path: ["compensation_maximum"]
});

type JobFormData = z.infer<typeof jobFormSchema>;

interface ValidationErrors {
  [key: string]: string[];
}

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder: string;
  error?: string;
}

const TagInput = ({ tags, setTags, placeholder, error }: TagInputProps) => {
  const [input, setInput] = useState('');

  const addTag = () => {
    if (input.trim()) {
      setTags([...tags, input.trim()]);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-green-800"
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
            error ? 'border-red-500' : ''
          }`}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={addTag}
          disabled={!input.trim()}
          className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
      <p className="mt-1 text-sm text-gray-500">
        Press Enter or click + to add
      </p>
    </div>
  );
};

export default function CreateJobPage() {
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    department: '',
    employment_type: '',
    location: '',
    description: '',
    description_list: [],
    requirements: '',
    requirements_list: [],
    compensation_minimum: '',
    compensation_maximum: '',
    benefits_desc: '',
    benefits_list: [],
    status: 'draft'
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Validate form data
      const jobData = jobFormSchema.parse(formData);
      
      // If validation passes, clear errors and submit
      setErrors({});
      // console.log('Form data is valid:', jobData);
      
      // Here you would typically make an API call to save the data
      const response = await fetch('/api/jobs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData)
      })

      const data = await response.json()

      console.log(data)
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to our error format
        const validationErrors: ValidationErrors = {};
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          if (!validationErrors[path]) {
            validationErrors[path] = [];
          }
          validationErrors[path].push(err.message);
        });
        setErrors(validationErrors);
        
        // Scroll to the first error
        const firstErrorField = document.querySelector('[aria-invalid="true"]');
        firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const updateList = (field: 'description_list' | 'requirements_list' | 'benefits_list', newList: string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: newList
    }));
    // Clear error when list is modified
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const getFieldError = (fieldName: string) => {
    return errors[fieldName]?.[0];
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
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
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
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    getFieldError('title') ? 'border-red-500' : ''
                  }`}
                  placeholder="e.g., Senior Software Engineer"
                  aria-invalid={!!getFieldError('title')}
                />
                {getFieldError('title') && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {getFieldError('title')}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    getFieldError('department') ? 'border-red-500' : ''
                  }`}
                  aria-invalid={!!getFieldError('department')}
                >
                  <option value="">Select Department</option>
                  <option value="engineering">Engineering</option>
                  <option value="design">Design</option>
                  <option value="product">Product</option>
                  <option value="marketing">Marketing</option>
                </select>
                {getFieldError('department') && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {getFieldError('department')}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employment Type *
                </label>
                <select
                  name="employment_type"
                  value={formData.employment_type}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    getFieldError('employment_type') ? 'border-red-500' : ''
                  }`}
                  aria-invalid={!!getFieldError('employment_type')}
                >
                  <option value="">Select Type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                </select>
                {getFieldError('employment_type') && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {getFieldError('employment_type')}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      getFieldError('location') ? 'border-red-500' : ''
                    }`}
                    placeholder="e.g., Remote, New York, London"
                    aria-invalid={!!getFieldError('location')}
                  />
                </div>
                {getFieldError('location') && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {getFieldError('location')}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Job Description Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Job Description</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-3 ${
                    getFieldError('description') ? 'border-red-500' : ''
                  }`}
                  placeholder="Main job description..."
                  aria-invalid={!!getFieldError('description')}
                />
                {getFieldError('description') && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {getFieldError('description')}
                  </p>
                )}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Responsibilities * (Press Enter to add)
                </label>
                <TagInput
                  tags={formData.description_list}
                  setTags={(newTags) => updateList('description_list', newTags)}
                  placeholder="Add a responsibility and press Enter"
                  error={getFieldError('description_list')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requirements *
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-3 ${
                    getFieldError('requirements') ? 'border-red-500' : ''
                  }`}
                  placeholder="Main requirements description..."
                  aria-invalid={!!getFieldError('requirements')}
                />
                {getFieldError('requirements') && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {getFieldError('requirements')}
                  </p>
                )}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specific Requirements * (Press Enter to add)
                </label>
                <TagInput
                  tags={formData.requirements_list}
                  setTags={(newTags) => updateList('requirements_list', newTags)}
                  placeholder="Add a requirement and press Enter"
                  error={getFieldError('requirements_list')}
                />
              </div>
            </div>
          </div>

          {/* Compensation Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gray-500" />
              Compensation & Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary Range *
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="compensation_minimum"
                      value={formData.compensation_minimum}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                        getFieldError('compensation_minimum') ? 'border-red-500' : ''
                      }`}
                      placeholder="Min"
                      aria-invalid={!!getFieldError('compensation_minimum')}
                    />
                  </div>
                  <span className="text-gray-500">to</span>
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="compensation_maximum"
                      value={formData.compensation_maximum}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                        getFieldError('compensation_maximum') ? 'border-red-500' : ''
                      }`}
                      placeholder="Max"
                      aria-invalid={!!getFieldError('compensation_maximum')}
                    />
                  </div>
                </div>
                {(getFieldError('compensation_minimum') || getFieldError('compensation_maximum')) && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {getFieldError('compensation_minimum') || getFieldError('compensation_maximum')}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Benefits Description *
                  </label>
                  <textarea
                    name="benefits_desc"
                    value={formData.benefits_desc}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      getFieldError('benefits_desc') ? 'border-red-500' : ''
                    }`}
                    placeholder="General benefits description..."
                    aria-invalid={!!getFieldError('benefits_desc')}
                  />
                  {getFieldError('benefits_desc') && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {getFieldError('benefits_desc')}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Benefits List * (Press Enter to add)
                  </label>
                  <TagInput
                    tags={formData.benefits_list}
                    setTags={(newTags) => updateList('benefits_list', newTags)}
                    placeholder="Add a benefit and press Enter"
                    error={getFieldError('benefits_list')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
              className="w-full sm:w-auto px-4 py-2 border rounded-lg hover:bg-gray-50 inline-flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Draft
            </button>
            <button
              type="button"
              className="w-full sm:w-auto px-4 py-2 border rounded-lg hover:bg-gray-50 inline-flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Preview
            </button>
            <button
              type="submit"
              onClick={() => setFormData(prev => ({ ...prev, status: 'published' }))}
              className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 inline-flex items-center justify-center gap-2"
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