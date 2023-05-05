import { Blog } from "@/components/public/Blog";
import { show } from "@/controllers/blogs/show";
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
  const response = await fetch(getApiUrl(`api/blogs/${params.id}`), {
    headers: headers() as HeadersInit,
  });

  if (!response.ok) {
    return {
      title: "Blog not found | the-fullstack-app",
      description:
        "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
    };
  }

  const blog: AsyncReturnType<typeof show> = await response.json();

  if (!blog) {
    return {
      title: "Blog not found | the-fullstack-app",
      description:
        "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
    };
  }

  return {
    title: `${blog.title} | the-fullstack-app`,
  };
}

interface BlogShowPageProps {
  params: {
    id: string;
  };
}

export default async function BlogShowPage({
  params: { id },
}: BlogShowPageProps) {
  const response = await fetch(getApiUrl(`api/blogs/${id}`), {
    headers: headers() as HeadersInit,
  });

  if (!response.ok) {
    return notFound();
  }

  const blog: AsyncReturnType<typeof show> = await response.json();

  if (!blog) {
    return notFound();
  }

  return (
    <div className="py-4 space-y-4 max-w-2xl mx-auto px-4">
      <div className="w-full">
        <Blog blog={blog} />
      </div>
    </div>
  );
}
