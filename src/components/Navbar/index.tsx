import { SignInButton } from "@/components/Navbar/SignInButton";
import { UserDetails } from "@/components/Navbar/UserDetails";
import { ProjectsSelectorDropdown } from "@/components/ProjectsSelectorDropdown";
import { authOptions } from "@/lib/auth";
import { getApiUrl } from "@/lib/get-api-url";
import { cn } from "@/lib/tailwind-utils";
import { Project } from "@prisma/client";
import { Cpu } from "lucide-react";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  const response = await fetch(getApiUrl("api/projects"), {
    headers: headers() as HeadersInit,
  });

  if (!response.ok) {
    return notFound();
  }

  const projects: Project[] = await response.json();

  return (
    <div className="border-b text-sm">
      <div
        className={cn("px-4 h-16 mx-auto flex items-center justify-between", {
          container: !session,
        })}
      >
        <div className="space-x-8 flex items-center">
          <Link href="/" className="font-bold space-x-2 flex items-center">
            <Cpu /> <span>the-fullstack-app</span>
          </Link>
          <div className="block lg:hidden">
            <ProjectsSelectorDropdown projects={projects} />
          </div>
        </div>
        <div className="space-x-4">
          {session ? <UserDetails session={session} /> : <SignInButton />}
        </div>
      </div>
    </div>
  );
};
