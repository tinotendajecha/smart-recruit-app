"use client";

import {
  ChevronRight,
  Eye,
  Edit,
  Users,
  Clock,
  FileText,
  User,
  Calendar,
  MessageSquare,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  XCircle,
  Building,
  Info,
  ArrowRight,
  ClockIcon,
} from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/zustand/userDataStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loading, LoadingBar, LoadingDots } from "@/components/ui/loading";
import { AdminDashboard } from "@/app/pages/AdminDashboard/page";
import CandidateDashboard from "@/app/pages/CandidateDashboard/page";

export default function DashboardPage() {
  // Load user from store
  const { user } = useUserStore();

  // This would come from your authentication context
  const userRole = user.role; // Change to "admin" to see admin dashboard
  
  if (userRole === "Candidate") {
    return <CandidateDashboard />;
  } else {
    return <AdminDashboard />;
  }
}




