import { ForumEditForm } from "@/components/admin/ForumEditForm";
import { getApiUrl } from "@/lib/get-api-url";
import { Forum, ForumComment, Forum as ForumEntity } from "@prisma/client";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

interface GenerateMetadataProps {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const response = await fetch(getApiUrl(`api/forums/${params.id}`), {
    headers: headers() as HeadersInit,
  });

  if (!response.ok) {
    return {
      title: "Forum not found | Admin | the-fullstack-app",
      description:
        "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
    };
  }

  const forum:
    | (ForumEntity & {
        comments: ForumComment[];
      })
    | null = await response.json();

  if (!forum) {
    return {
      title: "Forum not found | Admin | the-fullstack-app",
      description:
        "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
    };
  }

  return {
    title: `${forum.title} | Admin | the-fullstack-app`,
    description: forum.description,
  };
}

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
    <div className="p-4">
      <div className="w-full">
        <ForumEditForm forum={forum} />
      </div>
    </div>
  );
}
