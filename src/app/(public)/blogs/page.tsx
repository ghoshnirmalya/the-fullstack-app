import { list } from "@/actions/blogs/list";
import { BlogCard } from "@/components/public/Blog/BlogCard";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Blogs | the-fullstack-app",
  description:
    "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
};

export default async function BlogIndexPage() {
  const { data: blogs } = await list();

  if (!blogs?.length) {
    return notFound();
  }

  return (
    <div className="py-4 space-y-4 max-w-6xl mx-auto px-4">
      <div className="py-4 space-y-4 max-w-2xl mx-auto text-center h-full flex items-center">
        <section className="py-24 space-y-4 max-w-xl mx-auto px-4">
          <span className="rounded-full border py-2 px-4 text-sm bg-white">
            Blogs
          </span>
          <h1 className="text-2xl">Read the latest blog posts from our team</h1>
          <p className="text-gray-500">
            Read the latest blog posts from our team. Stay up-to-date with the
            latest trends in web development.
          </p>
        </section>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {blogs.map((blog) => {
          return <BlogCard key={blog.id} blog={blog} />;
        })}
      </div>
    </div>
  );
}
