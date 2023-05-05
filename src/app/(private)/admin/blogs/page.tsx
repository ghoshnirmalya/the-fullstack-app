import { BlogTable } from "@/components/admin/Blog/BlogTable";
import { buttonVariants } from "@/components/ui/button";
import { getApiUrl } from "@/lib/get-api-url";
import { Blog } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Blogs | Admin | the-fullstack-app",
  description:
    "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
};

export default async function BlogIndexPage() {
  const response = await fetch(getApiUrl("api/blogs"), {
    headers: headers() as HeadersInit,
  });

  if (!response.ok) {
    return notFound();
  }

  const blogs: Blog[] = await response.json();

  if (!blogs.length) {
    return notFound();
  }

  return (
    <div className="p-4 space-y-4 container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Blogs</h1>
        <Link href="/admin/blogs/new" className={buttonVariants({})}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add blog
        </Link>
      </div>
      <BlogTable blogs={blogs} />
    </div>
  );
}
