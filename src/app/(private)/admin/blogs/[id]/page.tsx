import { BlogEditForm } from "@/components/admin/Blog/BlogEditForm";
import { show } from "@/controllers/blogs/show";
import { getApiUrl } from "@/lib/get-api-url";
import { AsyncReturnType } from "@/lib/get-async-promise-return-type";
import { Blog } from "@prisma/client";
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
      title: "Blog not found | Admin | the-fullstack-app",
      description:
        "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
    };
  }

  const blog: AsyncReturnType<typeof show> = await response.json();

  if (!blog) {
    return {
      title: "Blog not found | Admin | the-fullstack-app",
      description:
        "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
    };
  }

  return {
    title: `${blog.title} | Admin | the-fullstack-app`,
    description: blog.content,
  };
}

interface IndexPageProps {
  params: {
    id: string;
  };
}

export default async function BlogmShowPage({
  params: { id },
}: IndexPageProps) {
  const response = await fetch(getApiUrl(`api/blogs/${id}`), {
    headers: headers() as HeadersInit,
  });

  if (!response.ok) {
    return notFound();
  }

  const blog: Blog = await response.json();

  if (!blog) {
    return notFound();
  }

  return (
    <div className="p-4 space-y-4 container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Edit blog</h1>
      </div>
      <div className="w-full lg:w-1/2">
        <BlogEditForm blog={blog} />
      </div>
    </div>
  );
}
