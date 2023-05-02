import { SignInButton } from "@/components/Navbar/SignInButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/tailwind-utils";
import Link from "next/link";

export default async function IndexPage() {
  return (
    <div className="p-4 space-y-4 container mx-auto text-center h-full flex items-center">
      <section className="py-24 space-y-4 max-w-xl mx-auto">
        <Link
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "rounded-full border"
          )}
          href="https://twitter.com/NirmalyaGhosh_"
          target="_blank"
        >
          Introducing the-fullstack-app
        </Link>
        <h1 className="text-6xl font-bold">the-fullstack-app</h1>
        <p className="text-2xl text-gray-600">
          This is a demo of a fullstack app using Next.js, Prisma, and NextAuth.
        </p>
        <div className="space-x-4">
          <SignInButton />
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="https://github.com/ghoshnirmalya/the-fullstack-app"
            target="_blank"
          >
            View code on GitHub
          </Link>
        </div>
      </section>
    </div>
  );
}
