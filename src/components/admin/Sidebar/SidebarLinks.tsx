"use client";

import { cn } from "@/lib/tailwind-utils";
import {
  ExternalLink,
  Home,
  LayoutDashboard,
  Newspaper,
  ScrollText,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarLinks = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-0 w-full flex justify-center flex-col items-center">
      <Link
        href="/"
        className={cn(
          "p-4 bg-transparent flex space-x-2 items-center w-full justify-center lg:justify-start border-b",
          {
            "bg-gray-200": pathname === "/",
          }
        )}
        target="_blank"
      >
        <span className="flex space-x-2 items-center w-full justify-center lg:justify-start">
          <Home className="w-4 h-4" />
          <span className="hidden lg:block">Public homepage</span>
        </span>
        <ExternalLink className="w-4 h-4 hidden lg:block" />
      </Link>
      <Link
        href="/admin/dashboard"
        className={cn(
          "p-4 bg-transparent flex space-x-2 items-center w-full justify-center lg:justify-start",
          {
            "bg-gray-200": pathname === "/admin/dashboard",
          }
        )}
      >
        <LayoutDashboard className="w-4 h-4" />
        <span className="hidden lg:block">Dashboard</span>
      </Link>
      <Link
        href="/admin/forums"
        className={cn(
          "p-4 bg-transparent flex space-x-2 items-center w-full justify-center lg:justify-start",
          {
            "bg-gray-200": pathname.startsWith("/admin/forums"),
          }
        )}
      >
        <Newspaper className="w-4 h-4" />
        <span className="hidden lg:block">Forums</span>
      </Link>
      <Link
        href="/admin/blogs"
        className={cn(
          "p-4 bg-transparent flex space-x-2 items-center w-full justify-center lg:justify-start",
          {
            "bg-gray-200": pathname.startsWith("/admin/blogs"),
          }
        )}
      >
        <ScrollText className="w-4 h-4" />
        <span className="hidden lg:block">Blogs</span>
      </Link>
    </div>
  );
};
