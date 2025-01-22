"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  MessageSquare,
  Settings,
  UserPlus,
  Bell,
  ChevronDown,
  Search,
  BrainCircuitIcon,
  Bot,
  FileText,
} from "lucide-react";

import { useParams } from "next/navigation";

// import { useRouter } from "next/router";
import MobileMenu from "@/components/MobileMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  // const router = useRouter()
  const { company_name } = useParams();

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: `/${company_name}/dashboard`,
    },
    {
      name: "Jobs",
      icon: <Briefcase className="w-5 h-5" />,
      path: `/${company_name}/dashboard/jobs`,
    },
    {
      name: "Applications",
      icon: <Users className="w-5 h-5" />,
      path: `/${company_name}/dashboard/applications`,
    },
    {
      name: "Candidate Helper",
      icon: <MessageSquare className="w-5 h-5" />,
      path: `/${company_name}/dashboard/chat`,
    },
    {
      name: "Team",
      icon: <UserPlus className="w-5 h-5" />,
      path: `/${company_name}/dashboard/team`,
    },
    {
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
      path: `/${company_name}/dashboard/settings`,
    },
    {
      name: "My Applications",
      icon: <FileText className="w-5 h-5" />,
      path: `/${company_name}/dashboard/my-applications`,
    },
    {
      name: "Chat Assistant",
      icon: <Bot className="w-5 h-5" />,
      path: `/${company_name}/dashboard/candidate-chat`,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 min-h-screen p-4 shadow-lg ${
          isSidebarOpen ? "md:block" : "hidden"
        } hidden `}
      >
        <div className=" flex items-center space-x-2 mb-8 mt-1">
          <BrainCircuitIcon className="h-8 w-8 text-green-600" />
          <span className="text-2xl font-bold">
            Smart<span className="text-green-600">Recruit</span>
          </span>
        </div>

        <nav>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                pathname === item.path ? "bg-green-50 text-green-600" : ""
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex flex-col">
            <div className="flex justify-between items-center px-2 py-1 md:hidden">
              <div className="md:hidden">
                <MobileMenu />
              </div>

              <div className=" flex items-center  mb-2 mt-1">
                <BrainCircuitIcon
                  size={30}
                  className="h-8 w-8 text-green-600"
                />
                <span className="text-2xl font-bold">
                  Smart<span className="text-green-600">Recruit</span>
                </span>
              </div>

              <div className="flex items-center">
                <button className="p-2 hover:bg-gray-100 rounded-full relative">
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                  <img
                    src="https://ui-avatars.com/api/?name=Admin+User"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative w-full md:hidden mb-3 ml-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 w-3/4 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 "
              />
            </div>
          </div>

          <div className="flex items-center justify-between md:p-4">
            <div className="flex items-center space-x-4 ">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg hidden md:block"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              {/* <div className="md:hidden">
                <MobileMenu />
              </div> */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 "
                />
              </div>
            </div>

            <div className="items-center space-x-4 hidden md:flex">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <Link href={`/${company_name}/dashboard/my-profile`}>
              <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                <img
                  src="https://ui-avatars.com/api/?name=Admin+User"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <ChevronDown className="w-4 h-4" />
              </button>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
