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

interface UserInfoFormProps {
  statement: string;
  role: string;
}

const UserInfoForm = ({ statement, role }: UserInfoFormProps) => {
  // Keeping the existing schema and validation
  const formSchema = z
    .object({
      name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long." }),
      surname: z
        .string()
        .min(2, { message: "Surname must be at least 2 characters long." }),
      email: z
        .string()
        .email({ message: "Please enter a valid email address." }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long." }),
      confirmPassword: z.string(),
      role: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Admin"
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password,
        role: values.role
      }),
    });

    const data = await response.json();
    console.log(data);
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-green-50 items-center justify-center p-12">
        <div className="max-w-lg">
          {/* Abstract SVG Illustration */}
          <svg
            className="w-full"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="250" cy="250" r="200" fill="#16a34a" fillOpacity="0.1" />
            <circle cx="250" cy="250" r="150" fill="#16a34a" fillOpacity="0.2" />
            <circle cx="250" cy="250" r="100" fill="#16a34a" fillOpacity="0.3" />
            <path
              d="M250 150 L350 250 L250 350 L150 250 Z"
              fill="#16a34a"
              fillOpacity="0.4"
            />
          </svg>
          
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Join Our Community</h2>
            <p className="mt-2 text-gray-600">
              Create an account and start your journey with us. Access all our features
              and connect with other professionals.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          <Form {...form}>
            <div className="flex flex-col mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600">
                {statement}
              </p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your name"
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Surname Field */}
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your surname"
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your email"
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm your password"
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                className="w-full h-11 bg-green-600 hover:bg-green-500 transition-colors duration-300"
                type="submit"
              >
                Create Account
              </Button>

              <div className="text-center">
                <span className="text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="/auth/login"
                    className="text-green-600 hover:text-green-500 font-medium hover:underline"
                  >
                    Login
                  </a>
                </span>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;