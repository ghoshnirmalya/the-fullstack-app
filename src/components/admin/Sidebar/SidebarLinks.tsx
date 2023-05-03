"use client";

import { cn } from "@/lib/tailwind-utils";
import { LayoutDashboard, Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarLinks = () => {
  const pathname = usePathname();

  return (
    <>
      <Link
        href="/admin/dashboard"
        className={cn("p-2 bg-transparent flex space-x-2 items-center", {
          "bg-muted rounded": pathname === "/admin/dashboard",
        })}
      >
        <LayoutDashboard className="w-6 h-6" />
        <span className="hidden lg:block">Dashboard</span>
      </Link>
      <Link
        href="/admin/forums"
        className={cn("p-2 bg-transparent flex space-x-2 items-center", {
          "bg-muted rounded": pathname.startsWith("/admin/forums"),
        })}
      >
        <Newspaper className="w-6 h-6" />
        <span className="hidden lg:block">Forums</span>
      </Link>
    </>
  );
};
