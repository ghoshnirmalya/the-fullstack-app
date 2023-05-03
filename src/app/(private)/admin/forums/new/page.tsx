import { ForumCreateForm } from "@/components/admin/ForumCreateForm";

export const metadata = {
  title: "Add new forum | the-fullstack-app",
  description:
    "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
};

export default async function ForumCreatePage() {
  return (
    <div className="p-4 gap-4">
      <div className="w-full xl:w-1/2 mx-auto">
        <ForumCreateForm />
      </div>
    </div>
  );
}
