"use client";

import { cn } from "@/lib/tailwind-utils";
import { BookOpen, FolderGit2, LayoutDashboard, Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-4 border-r p-4 h-full w-full text-sm">
      <Link
        href="/admin/dashboard"
        className={cn("p-2 bg-transparent flex space-x-2 items-center", {
          "bg-gray-100 rounded": pathname === "/admin/dashboard",
        })}
      >
        <LayoutDashboard className="w-6 h-6" />{" "}
        <span className="hidden lg:block">Dashboard</span>
      </Link>
      <Link
        href="/admin/projects"
        className={cn("p-2 bg-transparent flex space-x-2 items-center", {
          "bg-gray-100 rounded": pathname === "/admin/projects",
        })}
      >
        <FolderGit2 className="w-6 h-6" />{" "}
        <span className="hidden lg:block">Projects</span>
      </Link>
      <Link
        href="/admin/forums"
        className={cn("p-2 bg-transparent flex space-x-2 items-center", {
          "bg-gray-100 rounded": pathname === "/admin/forums",
        })}
      >
        <Newspaper className="w-6 h-6" />{" "}
        <span className="hidden lg:block">Forums</span>
      </Link>
      <Link
        href="/admin/blogs"
        className={cn("p-2 bg-transparent flex space-x-2 items-center", {
          "bg-gray-100 rounded": pathname === "/admin/blogs",
        })}
      >
        <BookOpen className="w-6 h-6" />{" "}
        <span className="hidden lg:block">Blogs</span>
      </Link>
    </div>
  );
};
