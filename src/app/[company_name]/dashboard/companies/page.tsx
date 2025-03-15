"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Building,
  MapPin,
  Users,
  ExternalLink,
  Filter,
  ChevronDown,
  ChevronRight,
  Globe,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { Company } from "@/types/Company";

// Mock data for companies

// Industry options
const industries = [
  "All Industries",
  "Software Development",
  "Finance",
  "Healthcare",
  "Marketing",
  "Education",
  "Manufacturing",
  "Retail",
];

// Company size options
const companySizes = [
  "All Sizes",
  "Small (1-50)",
  "Medium (51-500)",
  "Large (500+)",
];

// Countries from the data
const countries = [
  "All Countries",
  "Zimbabwe",
  "United States",
  "United Kingdom",
  "Singapore",
  "Germany",
  "Canada",
  "Japan",
  "Australia",
];

export default function CompaniesPage() {
  const [companiesData, setCompaniesData] = useState<Company[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedSize, setSelectedSize] = useState("All Sizes");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [sortOption, setSortOption] = useState("alphabetical");
  const [filteredCompanies, setFilteredCompanies] = useState(companiesData);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getRandomColor = () => {
    const colors = [
      "4CAF50", // Medium Green
      "388E3C", // Darker Green
      "2E7D32", // Deep Green
      "1B5E20", // Forest Green
      "66BB6A", // Light Green
      "FF9800", // Orange
      "F44336", // Red
      "03A9F4", // Sky Blue
      "9C27B0", // Purple
      "FFEB3B", // Yellow
      "FF5722", // Deep Orange
      "00BCD4", // Cyan
      "8BC34A", // Light Olive Green
      "607D8B", // Muted Blue-Gray
      "795548", // Warm Brown
    ];
    // Shades of green
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    try {
      fetch("/api/company/get-companies")
        .then((res) => res.json())
        .then((data) => {
          setCompaniesData(data.companies);
          setFilteredCompanies(data.companies);
        })
        .catch((error) => console.error("Error fetching companies:", error));
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Generate alphabet for filter
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  // Apply filters
  useEffect(() => {
    let result = [...companiesData]; // Make API call here to get companies data

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (company) =>
          company.company_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          company.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Industry filter
    if (selectedIndustry !== "All Industries") {
      result = result.filter(
        (company) => company.services_provided === selectedIndustry
      );
    }

    // Size filter
    if (selectedSize !== "All Sizes") {
      result = result.filter(
        (company) => company.organization_size === selectedSize
      );
    }

    // Country filter
    if (selectedCountry !== "All Countries") {
      result = result.filter((company) => company.country === selectedCountry);
    }

    // Alphabet filter
    if (selectedLetter) {
      result = result.filter((company) =>
        company.company_name.startsWith(selectedLetter)
      );
    }

    // Sorting
    if (sortOption === "alphabetical") {
      result = [...result].sort((a, b) =>
        a.company_name.localeCompare(b.company_name)
      );
    } else if (sortOption === "size") {
      const sizeOrder: Record<string, number> = {
        "Small (1-50)": 1,
        "Medium (51-500)": 2,
        "Large (500+)": 3,
      };

      result = [...result].sort(
        (a, b) =>
          (sizeOrder[a.organization_size] ?? 0) -
          (sizeOrder[b.organization_size] ?? 0)
      );
    } else if (sortOption === "featured") {
      result = [...result].sort(
        (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      );
    }

    setFilteredCompanies(result);
  }, [
    searchTerm,
    selectedIndustry,
    selectedSize,
    selectedCountry,
    selectedLetter,
    sortOption,
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span>Dashboard</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900">Companies</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Companies
              </h1>
              <p className="text-gray-600 mt-1">
                Explore and discover companies that match your interests
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                {filteredCompanies.length} companies found
              </span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search companies by name, location..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Alphabet Filter */}
          <div className="flex flex-wrap items-center gap-1 mb-6 border-b pb-4">
            <span className="text-sm font-medium text-gray-700 mr-2">
              Browse:
            </span>
            <button
              className={`w-7 h-7 flex items-center justify-center rounded-full text-sm ${
                selectedLetter === ""
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedLetter("")}
            >
              All
            </button>
            {alphabet.map((letter) => (
              <button
                key={letter}
                className={`w-7 h-7 flex items-center justify-center rounded-full text-sm ${
                  selectedLetter === letter
                    ? "bg-green-600 text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedLetter(letter)}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:hidden">
              <button
                className="w-full flex items-center justify-between px-4 py-2 border rounded-lg"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span>Filters</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ${
                isFilterOpen || "md:flex hidden"
              }`}
            >
              {/* Industry Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                >
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              {/* Company Size Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Size
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {companySizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Country Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="alphabetical">Alphabetical (A-Z)</option>
                  <option value="size">Company Size</option>
                  <option value="featured">Featured</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <div
                key={company.id}
                className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
                  company.featured
                    ? "border-2 border-green-500"
                    : "border border-gray-200"
                }`}
              >
                {company.featured && (
                  <div className="bg-green-600 text-white text-xs font-medium px-3 py-1 text-center">
                    Featured Company
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={`https://ui-avatars.com/api/?name=${
                        company.company_name
                      }&background=${getRandomColor()}&color=ffffff&rounded=true&size=128`}
                      alt="Profile"
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {company.company_name
                          .replaceAll("-", " ") // Replace hyphens with spaces if needed
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </h2>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {company.city}, {company.country}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {company.short_description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Briefcase className="w-4 h-4 text-gray-500" />
                      <span>{company.services_provided}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{company.organization_size}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <a
                        href={company.company_website || ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        {company.company_website?.replace("https://", "") || "N/A"}
                      </a>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <Link
                      href={`/candidate/dashboard/companies/${company.id}`}
                      className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/${company.company_name.toLowerCase()}/openings`}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                    >
                      View Jobs
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <Building className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No companies found
              </h3>
              <p className="text-gray-600 max-w-md">
                We couldn't find any companies matching your search criteria.
                Try adjusting your filters or search term.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
