"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  BriefcaseIcon, 
  BrainCircuitIcon, 
  MessagesSquareIcon, 
  UserCircleIcon,
  ChevronRightIcon,
  LinkedinIcon,
  FileTextIcon,
  UsersIcon
} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BrainCircuitIcon className="h-8 w-8 text-green-600" />
              <span className="font-bold text-xl">
                Smart<span className="text-green-600">Recruit</span>
              </span>
            </div>
            <div className=" items-center space-x-6 hidden md:flex">
              <Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900">How it Works</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/register/company">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
                  Try Demo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-400">
                Transform Your Hiring Process with AI
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Smart, efficient recruitment powered by artificial intelligence. Analyze profiles, screen resumes, and make better hiring decisions with our advanced AI tools.
              </p>
              <div className="flex space-x-4">
                <Link href={`/register/questionnaire`}>
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center">
                  Get Started <ChevronRightIcon className="ml-2 h-5 w-5" />
                </button>
                </Link>
                <Link href={`/auth/login`}>
                <button className="border border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-full font-medium transition-colors">
                  Sign In
                </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/assets/landing-page-img.jpg"
                alt="Smart Recruitment"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful AI-Driven Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive suite of AI tools streamlines your recruitment process
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<LinkedinIcon className="h-8 w-8 text-green-600" />}
              title="LinkedIn Profile Analyzer"
              description="AI-powered analysis of candidate profiles to identify top talent"
            />
            <FeatureCard 
              icon={<FileTextIcon className="h-8 w-8 text-green-600" />}
              title="Resume Analyzer"
              description="Smart resume screening and skill matching with job requirements"
            />
            <FeatureCard 
              icon={<MessagesSquareIcon className="h-8 w-8 text-green-600" />}
              title="AI Chatbot Assistant"
              description="24/7 candidate support and automated query resolution"
            />
            <FeatureCard 
              icon={<UsersIcon className="h-8 w-8 text-green-600" />}
              title="Team Management"
              description="Comprehensive hiring and staff management tools"
            />
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Trusted by Industry Leaders</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-50">
              {/* Add company logos here */}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Recruitment Process?
          </h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of companies using SmartRecruit to hire better, faster, and smarter.
          </p>
          <Link href="/register/questionnaire">
            <button className="bg-white text-green-600 px-8 py-3 rounded-full font-medium hover:bg-green-50 transition-colors">
              Start Free Trial
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}