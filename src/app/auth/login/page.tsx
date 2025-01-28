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
import { useRouter } from "next/navigation";

import { useState,useEffect } from "react";
import { LoadingDots, LoadingBar, Loading } from "@/components/ui/loading";

const page = () => {

  const [loading, setIsLoading] = useState(false)
  const[error, setError] = useState(null)

  useEffect(() => {

  }, [loading, error])

  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const email = values.email;
      const password = values.password;

      // Set loading state to true
      setIsLoading(true)

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      const company_name = data.company_data.company_name

      if (response.status === 401){
        setError(data.message)
        setIsLoading(false)
      }

      // Push user to their company dashboard
      if(company_name){
        router.push(`/${company_name}/dashboard`)
      }else{
        router.push('candidate/dashboard')
      }

      // Set loading state to false
      setIsLoading(false)
      
    } catch (error) {
      console.log('Something went wrong during login!')
    }
  };

  // Add animation
  if(loading){
    return(
     <div className="flex items-center justify-center h-screen">
       <Loading text="Signing In..."/>
     </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Form {...form}>
            <div className="flex flex-col mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Sign in to continue to your dashboard
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                <p>{error}</p>
              </div>
            )}

            {/* Form */}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              <Button
                className="w-full h-11 bg-green-600 hover:bg-green-500 transition-colors duration-300"
                type="submit"
              >
                Sign In
              </Button>

              <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <a href="/register/questionnaire" className="text-green-600 hover:text-green-500">
                  Sign up
                </a>
              </p>
            </form>
          </Form>
        </div>
      </div>

      {/* Right side - Animated Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-green-50 items-center justify-center p-12">
        <div className="max-w-lg">
          <svg
            className="w-full"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Circle */}
            <circle cx="250" cy="250" r="200" fill="#16a34a" fillOpacity="0.1">
              <animate
                attributeName="r"
                values="200;210;200"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Animated People Icons */}
            {/* Person 1 - Recruiter */}
            <g transform="translate(150, 200)">
              <animate
                attributeName="transform"
                values="translate(150, 200); translate(150, 190); translate(150, 200)"
                dur="2s"
                repeatCount="indefinite"
              />
              <circle cx="0" cy="0" r="20" fill="#16a34a" />
              <rect x="-15" y="25" width="30" height="40" rx="5" fill="#16a34a" />
            </g>

            {/* Person 2 - Candidate */}
            <g transform="translate(350, 200)">
              <animate
                attributeName="transform"
                values="translate(350, 200); translate(350, 190); translate(350, 200)"
                dur="2s"
                repeatCount="indefinite"
                begin="1s"
              />
              <circle cx="0" cy="0" r="20" fill="#16a34a" />
              <rect x="-15" y="25" width="30" height="40" rx="5" fill="#16a34a" />
            </g>

            {/* Connection Line */}
            <path
              d="M170 200 L330 200"
              stroke="#16a34a"
              strokeWidth="4"
              strokeDasharray="10"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="100;0"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>

            {/* Document Icons */}
            <g transform="translate(250, 300)">
              <animate
                attributeName="transform"
                values="translate(250, 300); translate(250, 290); translate(250, 300)"
                dur="3s"
                repeatCount="indefinite"
              />
              <rect x="-25" y="-35" width="50" height="70" rx="5" fill="#16a34a" fillOpacity="0.2" />
              <path d="M-15 -15 H15 M-15 0 H15 M-15 15 H15" stroke="#16a34a" strokeWidth="4" />
            </g>
          </svg>

          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Smart Recruitment Platform</h2>
            <p className="mt-2 text-gray-600">
              Connecting talented professionals with great companies through 
              AI-powered recruitment solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;