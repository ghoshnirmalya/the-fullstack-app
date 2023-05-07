import { list } from "@/actions/forums";
import { ForumTable } from "@/components/admin/Forum/ForumTable";
import { buttonVariants } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Forums | Admin | the-fullstack-app",
  description:
    "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
};

export default async function ForumIndexPage() {
  const forums = await list();

  if (!forums.length) {
    return notFound();
  }

  return (
    <div className="p-4 space-y-4 container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Forums</h1>
        <Link href="/admin/forums/new" className={buttonVariants({})}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add forum
        </Link>
      </div>
      <ForumTable forums={forums} />
    </div>
  );
}
