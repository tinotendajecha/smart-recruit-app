"use client";

import React, { useEffect } from "react";
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
  Mail,
  Brain,
  Building2,
} from "lucide-react";
import { Loading } from "@/components/ui/loading";

import { useParams } from "next/navigation";
import { useUserStore } from "@/zustand/userDataStore";

// import { useRouter } from "next/router";
import MobileMenu from "@/components/MobileMenu";
// import Router from "next/navigation";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  // const router = useRouter()
  const { company_name } = useParams();

  // Load user from store
  const { user } = useUserStore();

  const router = useRouter()

  const handleLogout = async () => {
    try {
      // Logout
      // Clear the session cookie
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.push("/auth/login");
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user.role) {
      setIsLoading(false);
    }
  });

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: `/${company_name}/dashboard`,
      role: "Both",
    },
    {
      name: "Applications",
      icon: <Users className="w-5 h-5" />,
      path: `/${company_name}/dashboard/applications`,
      role: "Admin",
    },
    {
      name: "Jobs",
      icon: <Briefcase className="w-5 h-5" />,
      path: `/${company_name}/dashboard/jobs`,
      role: "Admin",
    },
    {
      name: "My Applications",
      icon: <FileText className="w-5 h-5" />,
      path: `/${company_name}/dashboard/my-applications`,
      role: "Candidate",
    },
    {
      name: "Chat Assistant",
      icon: <Bot className="w-5 h-5" />,
      path: `/${company_name}/dashboard/candidate-chat`,
      role: "Both",
    },
    {
      name: "Knowledge Base",
      icon: <Brain className="w-5 h-5" />,
      path: `/${company_name}/dashboard/knowledge-base`,
      role: "Admin",
    },
    {
      name: "Team",
      icon: <UserPlus className="w-5 h-5" />,
      path: `/${company_name}/dashboard/team`,
      role: 'Admin'
    },
    // {
    //   name: "Invite",
    //   icon: <Mail className="w-5 h-5" />,
    //   path: `/${company_name}/dashboard/invites`,
    //   role: "Admin",
    // },
    {
      name: "Companies",
      icon: <Building2 className="w-5 h-5" />,
      path: `/${company_name}/dashboard/companies`,
      role: "Candidate",
    },
    {
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
      path: `/${company_name}/dashboard/settings`,
      role: "Both",
    },
  ];

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(
    (item) => item.role === user.role || item.role === "Both"
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

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
          {filteredNavItems.map((item) => (
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
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.name}+${user.surname}`}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link
                      href={`/${company_name}/dashboard/my-profile`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>
                    <Link
                      href={`/${company_name}/dashboard/settings`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => {
                        // Add your logout logic here
                        console.log("Logging out...");
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
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
              <div className="relative group">
                <Link href={`/${company_name}/dashboard/my-profile`}>
                  <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.name}+${user.surname}`}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </Link>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link
                    href={`/${company_name}/dashboard/my-profile`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                  <Link
                    href={`/${company_name}/dashboard/settings`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
