import { SignInButton } from "@/components/public/Navbar/SignInButton";
import { UserDetails } from "@/components/public/Navbar/UserDetails";
import { authOptions } from "@/lib/auth";
import { Cpu } from "lucide-react";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="border-b text-sm">
      <div className="px-4 h-16 mx-auto flex items-center justify-between">
        <div className="space-x-8 flex items-center">
          <Link href="/" className="font-bold space-x-2 flex items-center">
            <Cpu /> <span>the-fullstack-app</span>
          </Link>
        </div>
        <div className="space-x-4">
          {session ? <UserDetails session={session} /> : <SignInButton />}
        </div>
      </div>
    </div>
  );
};
