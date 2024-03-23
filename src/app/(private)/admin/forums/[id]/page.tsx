import { show } from "@/actions/forums/show";
import { ForumEditForm } from "@/components/admin/Forum/ForumEditForm";
import { Metadata } from "next";

interface GenerateMetadataProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { data: forum } = await show({
    id: Number(params.id),
  });

  if (!forum) {
    return {
      title: "Forum not found | Admin | the-fullstack-app",
      description:
        "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
    };
  }

  return {
    title: `${forum.title} | Admin | the-fullstack-app`,
  };
}

interface IndexPageProps {
  params: {
    id: string;
  };
}

export default async function ForumShowPage({
  params: { id },
}: IndexPageProps) {
  return (
    <div className="p-4 space-y-4 container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Edit forum</h1>
      </div>
      <div className="w-full">
        <ForumEditForm forumId={Number(id)} />
      </div>
    </div>
  );
}
