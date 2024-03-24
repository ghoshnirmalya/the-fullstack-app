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
    <div className="py-4 space-y-4 max-w-6xl mx-auto px-4">
      <div className="py-4 space-y-4 max-w-2xl mx-auto text-center h-full flex items-center">
        <section className="py-24 space-y-4 max-w-xl mx-auto px-4">
          <span className="rounded-full border py-2 px-4 text-sm bg-white">
            Forums
          </span>
          <h1 className="text-2xl">
            Join the conversation with other developers
          </h1>
          <p className="text-gray-500">
            Join the conversation with other developers. Share your thoughts,
            ask questions, and get help.
          </p>
        </section>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {forums.map((forum) => {
          return <ForumCard key={forum.id} forum={forum} />;
        })}
      </div>
    </div>
  );
}
