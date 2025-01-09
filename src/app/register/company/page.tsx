"use client";
import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
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
  };

  return (
      <div className="flex flex-col mt-10 items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3">
            <div className="flex flex-col mb-3 items-start">
              <span className="text-3xl font-bold text-green-600">
                Register company
              </span>
              <span className="">We need to know a bit about your company.</span>
            </div>
            <div className="form-fields">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organizationSize"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-2">
                    <FormLabel>Organization Size</FormLabel>
                    <FormControl>
                      <select {...field} className="form-select border border-gray-300 p-1">
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
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="servicesProvided"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-2">
                    <FormLabel>Services Provided</FormLabel>
                    <FormControl>
                      <select {...field} className="form-select border border-gray-300 p-1">
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
                      <Input {...field} placeholder="https://example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="form-controls mt-2 flex flex-col items-end">
              <Link href="/register/admin-user">
                 <Button className="bg-green-600 hover:bg-green-500">Next</Button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
  );
};

export default page;