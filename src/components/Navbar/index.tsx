import { authOptions } from "@/lib/auth";
import { SignInButton } from "@/components/Navbar/SignInButton";
import { UserDetails } from "@/components/Navbar/UserDetails";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="border-b text-sm">
      <div className="px-4 h-16 container mx-auto flex items-center justify-between">
        <div className="space-x-4">
          <Link href="/" className="font-bold mr-8">
            Logo
          </Link>
          <Link href="/">Dashboard</Link>
          <Link href="/projects">Projects</Link>
        </div>
        <div className="space-x-4">
          {session ? <UserDetails session={session} /> : <SignInButton />}
        </div>
      </div>
    </div>
  );
};
