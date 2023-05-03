"use client";

import { cn } from "@/lib/tailwind-utils";
import { BookOpen, FolderGit2, LayoutDashboard, Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-2 border-r p-4 h-full w-full text-sm">
      <Link
        href="/dashboard"
        className={cn("p-2 bg-transparent flex space-x-2 items-center", {
          "bg-muted rounded": pathname === "/dashboard",
        })}
      >
        <LayoutDashboard className="w-6 h-6" />{" "}
        <span className="hidden lg:block">Dashboard</span>
      </Link>
      <Link
        href="/projects"
        className={cn("p-2 bg-transparent flex space-x-2 items-center", {
          "bg-muted rounded": pathname.startsWith("/projects"),
        })}
      >
        <FolderGit2 className="w-6 h-6" />{" "}
        <span className="hidden lg:block">Projects</span>
      </Link>
      <Link
        href="/forums"
        className={cn("p-2 bg-transparent flex space-x-2 items-center", {
          "bg-muted rounded": pathname.startsWith("/forums"),
        })}
      >
        <Newspaper className="w-6 h-6" />{" "}
        <span className="hidden lg:block">Forums</span>
      </Link>
      <Link
        href="/blogs"
        className={cn("p-2 bg-transparent flex space-x-2 items-center", {
          "bg-muted rounded": pathname.startsWith("/blogs"),
        })}
      >
        <BookOpen className="w-6 h-6" />{" "}
        <span className="hidden lg:block">Blogs</span>
      </Link>
    </div>
  );
};
