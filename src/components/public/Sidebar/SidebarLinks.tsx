"use client";

import { cn } from "@/lib/tailwind-utils";
import { Home, Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarLinks = () => {
  const pathname = usePathname();

  return (
    <>
      <Link
        href="/"
        className={cn("p-2 bg-transparent flex space-x-2 items-center", {
          "bg-muted rounded": pathname === "/",
        })}
      >
        <Home className="w-6 h-6" />
        <span className="hidden lg:block">Home</span>
      </Link>
      <Link
        href="/forums"
        className={cn("p-2 bg-transparent flex space-x-2 items-center", {
          "bg-muted rounded": pathname.startsWith("/forums"),
        })}
      >
        <Newspaper className="w-6 h-6" />
        <span className="hidden lg:block">Forums</span>
      </Link>
    </>
  );
};
