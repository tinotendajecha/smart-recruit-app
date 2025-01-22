import { Dialog } from "@headlessui/react";
import { Bot, FileText, Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import { useParams } from "next/navigation";
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
} from "lucide-react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const { company_name } = useParams();
  const pathname = usePathname();

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
    {
      name: "Invite",
      icon: <Mail className="w-5 h-5" />,
      path: `/${company_name}/dashboard/invites`,
    },
  ];

  return (
    <div>
      <button
        className=" hover:bg-gray-100 rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={35} />
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-50 inset-0"
      >
        <div className="flex items-center justify-center min-h-screen bg-black/50">
          <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-lg">
            <nav className="space-y-4">
              <div
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between"
              >
                <div className=" flex items-center space-x-2">
                  <BrainCircuitIcon className="h-8 w-8 text-green-600" />
                  <span className="text-2xl font-bold">
                    Smart<span className="text-green-600">Recruit</span>
                  </span>
                </div>
                <X size={30} />
              </div>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className={`flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                    pathname === item.path ? "bg-green-50 text-green-600" : ""
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
