import { ForumCard } from "@/components/public/Forum/ForumCard";
import { getApiUrl } from "@/lib/get-api-url";
import { Forum } from "@prisma/client";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Forums | the-fullstack-app",
  description:
    "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
};

export default async function ForumIndexPage() {
  const response = await fetch(getApiUrl("api/forums"), {
    headers: headers() as HeadersInit,
  });

  if (!response.ok) {
    return notFound();
  }

  const forums: Forum[] = await response.json();

  if (!forums.length) {
    return notFound();
  }

  return (
    <div className="p-4 space-y-4 container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Forums</h1>
      </div>
      <div className="space-y-4">
        {forums.map((forum) => {
          return <ForumCard key={forum.id} forum={forum} />;
        })}
      </div>
    </div>
  );
}
