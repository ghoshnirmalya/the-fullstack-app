import { ForumCard } from "@/components/admin/ForumCard";
import { buttonVariants } from "@/components/ui/button";
import { getApiUrl } from "@/lib/get-api-url";
import { Forum } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
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
        <Link href="/forums/new" className={buttonVariants({})}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add forum
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {forums.map((forum) => {
          return <ForumCard key={forum.id} forum={forum} />;
        })}
      </div>
    </div>
  );
}
