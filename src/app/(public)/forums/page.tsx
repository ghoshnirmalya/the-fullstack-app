import { list } from "@/actions/forums/list";
import { ForumCard } from "@/components/public/Forum/ForumCard";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Forums | the-fullstack-app",
  description:
    "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
};

export default async function ForumIndexPage() {
  const { data: forums } = await list();

  if (!forums?.length) {
    return notFound();
  }

  return (
    <div className="py-4 space-y-4 max-w-2xl mx-auto px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Forums</h1>
      </div>
      <div className="space-y-4">
        {forums.map((forum) => {
          return <ForumCard key={forum.id} forum={forum} />;
        })}
      </div>
    </div>
  );
}
