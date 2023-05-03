import { ForumEditForm } from "@/components/admin/ForumEditForm";
import { getApiUrl } from "@/lib/get-api-url";
import { Forum } from "@prisma/client";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

interface IndexPageProps {
  params: {
    id: string;
  };
}

export default async function ForumShowPage({
  params: { id },
}: IndexPageProps) {
  const response = await fetch(getApiUrl(`api/forums/${id}`), {
    headers: headers() as HeadersInit,
  });

  if (!response.ok) {
    return notFound();
  }

  const forum: Forum = await response.json();

  if (!forum) {
    return notFound();
  }

  return (
    <div className="p-4 gap-4 container mx-auto flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2">
        <ForumEditForm forum={forum} />
      </div>
    </div>
  );
}