import { SignInButton } from "@/components/public/Navbar/SignInButton";
import { UserDetails } from "@/components/public/Navbar/UserDetails";
import { authOptions } from "@/lib/auth";
import { Cpu } from "lucide-react";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { NavbarLinks } from "@/components/public/Navbar/NavbarLinks";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="border-b text-sm fixed w-full bg-white z-10">
      <div className="h-16 flex items-center justify-between max-w-2xl mx-auto px-4">
        <div className="space-x-8 flex items-center">
          <Link href="/" className="font-bold space-x-2 flex items-center">
            <Cpu /> <span>the-fullstack-app</span>
          </Link>
          <NavbarLinks />
        </div>
        <div className="space-x-4">
          {session ? <UserDetails session={session} /> : <SignInButton />}
        </div>
      </div>
    </nav>
  );
};
