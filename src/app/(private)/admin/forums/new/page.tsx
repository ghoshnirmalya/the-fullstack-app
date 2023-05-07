import { ForumCreateForm } from "@/components/admin/Forum/ForumCreateForm";

export const metadata = {
  title: "Add new forum | Admin | the-fullstack-app",
  description:
    "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
};

export default async function ForumCreatePage() {
  return (
    <div className="p-4 space-y-4 container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Create new forum</h1>
      </div>
      <div className="w-full">
        {/* @ts-expect-error Async Server Component */}
        <ForumCreateForm />
      </div>
    </div>
  );
}
