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

const CompanyInfoForm = () => {
  const formSchema = z.object({
    companyName: z.string().min(1, "Company Name is required").max(256, "Company Name is too long"),
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3">
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
              <FormItem>
                <FormLabel>Organization Size</FormLabel>
                <FormControl>
                  <select {...field} className="form-select">
                    <option value="">Select an option</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
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
              <FormItem>
                <FormLabel>Services Provided</FormLabel>
                <FormControl>
                  <select {...field} className="form-select">
                    <option value="">Select a service</option>
                    <option value="softwareDevelopment">Software Development</option>
                    <option value="clothing">Clothing</option>
                    <option value="Marketing">Marketing</option>
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

        <div className="form-controls mt-2">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default CompanyInfoForm;
