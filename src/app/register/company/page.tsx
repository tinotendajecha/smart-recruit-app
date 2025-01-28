"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFormStore } from "@/zustand/companyFormStore";
import { useRouter } from "next/navigation";

const page = () => {
  
  // Instantiate zustand state 
  const setFormStore = useFormStore((state) => state.setFormStore)

  const router  = useRouter()

  const formSchema = z.object({
    companyName: z
      .string()
      .min(1, "Company Name is required")
      .max(256, "Company Name is too long"),
    organizationSize: z.string().min(1, "Organization size is required"),
    countryLocation: z.string().min(1, "Country location is required"),
    cityLocation: z.string().min(1, "City location is required"),
    servicesProvided: z.string().min(1, "Services provided is required"),
    companyWebsite: z.string().url("Invalid URL"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      organizationSize: "",
      countryLocation: "",
      cityLocation: "",
      servicesProvided: "",
      companyWebsite: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);

    // Set state to Zustand
    setFormStore(values)

    // navigate to next pagee
    router.push('/register/user')
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Register Company
                </h1>
                <p className="text-gray-600">
                  We need to know a bit about your company.
                </p>
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Enter your company name"
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organizationSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Size</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="">Select an option</option>
                          <option value="1-2">1 - 2</option>
                          <option value="2-10">2 - 10</option>
                          <option value="10-20">10-20</option>
                          <option value="20-100">20-100</option>
                          <option value="More than 100">More than 100</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="countryLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Enter your country"
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cityLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Enter your city"
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="servicesProvided"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Services Provided</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="">Select a service</option>
                          <option value="softwareDevelopment">
                            Software Development
                          </option>
                          <option value="clothing">Clothing</option>
                          <option value="Marketing">Marketing</option>
                          <option value="other">Other</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyWebsite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Website</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="https://example.com"
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* <Link href="/register/admin-user" className="block"> */}
                <Button 
                className="w-full h-11 bg-green-600 hover:bg-green-500 transition-colors duration-300"
                //  onClick={onSubmit}
                 >
                  Next
                </Button>
              {/* </Link> */}
            </form>
          </Form>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-green-50 items-center justify-center p-12">
        <div className="max-w-lg">
          {/* Modern Abstract SVG Illustration */}
          <svg
            className="w-full"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Elements */}
            <path
              d="M50 250C50 138.497 138.497 50 250 50C361.503 50 450 138.497 450 250C450 361.503 361.503 450 250 450C138.497 450 50 361.503 50 250Z"
              fill="#16a34a"
              fillOpacity="0.1"
            />
            
            {/* Building/Company Representation */}
            <path
              d="M150 350V200H350V350"
              stroke="#16a34a"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <rect
              x="200"
              y="250"
              width="100"
              height="100"
              fill="#16a34a"
              fillOpacity="0.2"
            />
            <path
              d="M225 200L275 150L325 200"
              stroke="#16a34a"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Decorative Elements */}
            <circle cx="250" cy="300" r="20" fill="#16a34a" fillOpacity="0.4" />
            <path
              d="M200 175L225 150L250 175L225 200Z"
              fill="#16a34a"
              fillOpacity="0.3"
            />
            <path
              d="M300 175L325 150L350 175L325 200Z"
              fill="#16a34a"
              fillOpacity="0.3"
            />
          </svg>
          
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Grow Your Business</h2>
            <p className="mt-2 text-gray-600">
              Join our platform and connect with talented professionals. 
              Let us help you build the perfect team for your company.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;