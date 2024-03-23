import { show } from "@/actions/forums/show";
import { Forum } from "@/components/public/Forum";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface GenerateMetadataProps {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
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
      title: "Forum not found | the-fullstack-app",
      description:
        "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
    };
  }

  return {
    title: `${forum.title} | the-fullstack-app`,
  };
}

interface ForumShowPageProps {
  params: {
    id: string;
  };
}

export default async function ForumShowPage({
  params: { id },
}: ForumShowPageProps) {
  const { data: forum } = await show({
    id: Number(id),
  });

  if (!forum) {
    return notFound();
  }

  return (
    <div className="py-4 space-y-4 max-w-2xl mx-auto px-4">
      <div className="w-full">
        <Forum forum={forum} />
      </div>
    </div>
  );
}
