import { Forum } from "@/components/public/Forum";
import { show } from "@/controllers/forums/show";
import { getApiUrl } from "@/lib/get-api-url";
import { AsyncReturnType } from "@/lib/get-async-promise-return-type";
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
      title: "Forum not found | the-fullstack-app",
      description:
        "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
    };
  }

  const forum: AsyncReturnType<typeof show> = await response.json();

  if (!forum) {
    return {
      title: "Forum not found | the-fullstack-app",
      description:
        "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
    };
  }

  return {
    title: `${forum.title} | the-fullstack-app`,
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

  const forum: AsyncReturnType<typeof show> = await response.json();

  if (!forum) {
    return notFound();
  }

  return (
    <div className="py-4 space-y-4 container">
      <div className="w-full">
        <Forum forum={forum} />
      </div>
    </div>
  );
}
