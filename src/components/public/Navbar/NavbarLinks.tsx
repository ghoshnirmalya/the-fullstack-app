"use client";

import { cn } from "@/lib/tailwind-utils";
import { Newspaper, ScrollIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavbarLinks = () => {
  const pathname = usePathname();

  return (
    <div className="space-x-2 flex items-center">
      <Link
        href="/forums"
        className={cn("p-2 bg-transparent flex space-x-2 items-center", {
          "font-semibold rounded": pathname.startsWith("/forums"),
        })}
      >
        <Newspaper className="w-4 h-4" />
        <span className="hidden lg:block">Forums</span>
      </Link>
      <Link
        href="/blogs"
        className={cn("p-2 bg-transparent flex space-x-2 items-center", {
          "font-semibold rounded": pathname.startsWith("/blogs"),
        })}
      >
        <ScrollIcon className="w-4 h-4" />
        <span className="hidden lg:block">Blogs</span>
      </Link>
    </div>
  );
};
