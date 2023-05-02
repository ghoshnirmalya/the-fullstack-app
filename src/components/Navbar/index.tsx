import { authOptions } from "@/lib/auth";
import { SignInButton } from "@/components/Navbar/SignInButton";
import { UserDetails } from "@/components/Navbar/UserDetails";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Cpu } from "lucide-react";
import { cn } from "@/lib/tailwind-utils";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="border-b text-sm">
      <div
        className={cn("px-4 h-16 mx-auto flex items-center justify-between", {
          container: !session,
        })}
      >
        <div className="space-x-4 flex items-center">
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
