import { list } from "@/actions/blogs/list";
import { BlogTable } from "@/components/admin/Blog/BlogTable";
import { buttonVariants } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Blogs | Admin | the-fullstack-app",
  description:
    "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
};

export default async function BlogIndexPage() {
  const { data: blogs } = await list();

  if (!blogs?.length) {
    return notFound();
  }

  return (
    <div className="p-4 container mx-auto">
      <div className="bg-white p-4 border rounded-lg space-y-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Blogs</h1>
          <Link href="/admin/blogs/new" className={buttonVariants({})}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add blog
          </Link>
        </div>
        <BlogTable blogs={blogs} />
      </div>
    </div>
  );
}
