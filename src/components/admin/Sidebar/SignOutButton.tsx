"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const router = useRouter();

  return (
    <DropdownMenuItem
      onClick={() => {
        signOut();

        router.push("/authentication");
      }}
      className="text-center flex justify-center lg:justify-start items-center"
    >
      <LogOut className="lg:mr-2 h-4 w-4" />
      <span className="hidden lg:block">Log out</span>
    </DropdownMenuItem>
  );
};
