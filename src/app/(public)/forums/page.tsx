import { ForumCard } from "@/components/admin/ForumCard";
import { getApiUrl } from "@/lib/get-api-url";
import { Forum } from "@prisma/client";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

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
        <h1 className="text-2xl font-bold">Forums</h1>
      </div>
      <div className="space-y-4">
        {forums.map((forum) => {
          return <ForumCard key={forum.id} forum={forum} />;
        })}
      </div>
    </div>
  );
}
