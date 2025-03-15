"use client";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  Building,
  MapPin,
  Globe,
  Calendar,
  Mail,
  Phone,
  Save,
  ArrowLeft,
  Plus,
  X,
  Briefcase,
  Users,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useUserStore } from "@/zustand/userDataStore";
import { Loading } from "@/components/ui/loading";
import { Company } from "@/types/Company";
import { useRouter } from "next/navigation";
import { set } from "zod";

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder: string;
}

const TagInput = ({ tags, setTags, placeholder }: TagInputProps) => {
  const [input, setInput] = useState("");

  const addTag = () => {
    if (input.trim()) {
      setTags([...tags, input.trim()]);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const { company_name } = useParams();

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
          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
      <p className="mt-1 text-sm text-gray-500">
        Press Enter or click + to add
      </p>
    </div>
  );
};

export default function EditCompanyPage() {
  const { company_name } = useParams();

  const router = useRouter();

  const { user } = useUserStore();
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  });

  const [formData, setFormData] = useState<Company>({
    id: "",
    company_name: "",
    organization_size: "",
    country: "",
    city: "",
    services_provided: "",
    // website: "",
    about_company: "",
    featured: null,
    founded: "",
    company_culture: "",
    benefits_and_perks: [] as string[],
    email: "",
    phone: "",
    Address: "",
    linkedin: "",
    Twitter: "",
    Facebook: "",
    short_description: "",
    company_website: "", // Add a default company_website value
  });

  // Get company data
  useEffect(() => {
    async function getCompanyInfo() {
      setIsLoading(true);
      const getCompanyData = await fetch(
        `/api/company/get-company?company_id=${user.Company_User[0].company_id}`
      );

      if (getCompanyData.status === 200) {
        const companyData = await getCompanyData.json();
        const company: Company = companyData.company;

        setFormData(company);
      }
      setIsLoading(false);
    }
    getCompanyInfo();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('whyyy')

    setIsLoading(true);
    // Here you would call your API to update the company profile

    const updateCompany = await fetch("/api/company/update-company", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log(updateCompany);

    if (updateCompany.status == 200) {
      const response = await updateCompany.json();
      setIsLoading(false);
    }

    router.push(`/${company_name}/dashboard`);
  };

  if (isloading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />;
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500">
        <Link
          href={`/${company_name}/dashboard`}
          className="flex items-center hover:text-gray-700"
        >
          {/* <ArrowLeft className="w-4 h-4 mr-1" /> */}
          Back to Dashboard
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900">Edit Company Profile</span>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <h1 className="text-2xl font-semibold mb-2">Edit Company Profile</h1>
        <p className="text-gray-500 mb-6">
          Update your company information to attract the best candidates.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Details Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Building className="w-5 h-5 text-green-500" />
              Basic Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={
                    formData.company_name
                      .split("-") // Split by hyphen
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      ) // Capitalize first letter
                      .join(" ") // Join words with space
                  }
                  onChange={handleInputChange}
                  readOnly
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Yirifi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Size
                </label>
                <select
                  name="organization_size"
                  value={formData.organization_size}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="Small (1-50)">Small (1-50)</option>
                  <option value="Medium (51-500)">Medium (51-500)</option>
                  <option value="Large (500+)">Large (500+)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry/Services
                </label>
                <input
                  type="text"
                  name="services_provided"
                  value={formData.services_provided}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Software Development"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Founded Year
                </label>
                <input
                  type="text"
                  name="founded"
                  value={formData.founded ?? ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., 2018"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                  <input
                    type="text"
                    name="company_website"
                    value={formData.company_website ?? ""}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., https://yirifi.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Description
              </label>
              <textarea
                name="short_description"
                value={formData.short_description ?? ""}
                onChange={handleInputChange}
                rows={2}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Brief description of your company"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Zimbabwe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    required
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., Harare"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={!!formData.featured}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label
                htmlFor="featured"
                className="ml-2 block text-sm text-gray-700"
              >
                Feature this company (will be highlighted in company listings)
              </label>
            </div>
          </div>

          {/* About & Culture Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-green-500" />
              About & Culture
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  About Company
                </label>
                <textarea
                  name="about_company"
                  value={formData.about_company ?? ""}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Detailed description of your company, history, mission, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Culture
                </label>
                <textarea
                  name="company_culture"
                  value={formData.company_culture ?? ""}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Describe your company culture, values, work environment, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Benefits & Perks
                </label>
                <TagInput
                  tags={formData.benefits_and_perks}
                  setTags={(newTags) =>
                    setFormData((prev) => ({
                      ...prev,
                      benefits_and_perks: newTags,
                    }))
                  }
                  placeholder="Add a benefit and press Enter (e.g., Health Insurance)"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-500" />
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email ?? ""}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., info@yirifi.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone ?? ""}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., +263 123 456 789"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                <input
                  type="text"
                  name="Address"
                  required
                  value={formData.Address ?? ""}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., 123 Innovation Drive, Harare, Zimbabwe"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-500" />
              Social Media
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin ?? ""}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., https://linkedin.com/company/yirifi"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter
                </label>
                <div className="relative">
                  <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                  <input
                    type="text"
                    name="Twitter"
                    value={formData.Twitter ?? ""}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., https://twitter.com/yirifi"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                <div className="relative">
                  <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                  <input
                    type="text"
                    name="Facebook"
                    value={formData.Facebook ?? ""}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., https://facebook.com/yirifi"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-4 py-2 border rounded-lg hover:bg-gray-50 inline-flex items-center justify-center gap-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 inline-flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
