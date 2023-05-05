import { BlogCard } from "@/components/public/Blog/BlogCard";
import { getApiUrl } from "@/lib/get-api-url";
import { Blog } from "@prisma/client";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Blogs | the-fullstack-app",
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
    <div className="py-4 space-y-4 max-w-2xl mx-auto px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Blogs</h1>
      </div>
      <div className="space-y-4">
        {blogs.map((blog) => {
          return <BlogCard key={blog.id} blog={blog} />;
        })}
      </div>
    </div>
  );
}
