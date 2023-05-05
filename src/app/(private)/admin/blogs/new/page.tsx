import { BlogCreateForm } from "@/components/admin/Blog/BlogCreateForm";

export const metadata = {
  title: "Add new blog | Admin | the-fullstack-app",
  description:
    "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
};

export default async function BlogCreatePage() {
  return (
    <div className="p-4 space-y-4 container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Create new blog</h1>
      </div>
      <div className="w-full lg:w-1/2">
        <BlogCreateForm />
      </div>
    </div>
  );
}
