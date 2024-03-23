import { SidebarLinks } from "@/components/admin/Sidebar/SidebarLinks";
import { SignInButton } from "@/components/admin/Sidebar/SignInButton";
import { UserDetails } from "@/components/admin/Sidebar/UserDetails";
import { authOptions } from "@/lib/auth";
import { Cpu } from "lucide-react";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col space-y-2 h-full w-[73px] lg:w-full text-sm justify-between border-r items-center">
      <div className="space-y-0 w-full flex flex-col justify-center lg:justify-start items-center">
        <Link
          href="/admin/dashboard"
          className="font-bold space-x-2 flex items-center px-3 p-4 border-b w-full justify-center lg:justify-start"
        >
          <Cpu /> <span className="hidden lg:block">the-fullstack-app</span>
        </Link>
        <SidebarLinks />
      </div>
      <div className="space-x-4 w-full flex justify-center items-center">
        {session ? <UserDetails session={session} /> : <SignInButton />}
      </div>
    </div>
  );
};
