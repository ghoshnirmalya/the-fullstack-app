import { show } from "@/actions/blogs/show";
import { Blog } from "@/components/public/Blog";
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
  const { data: blog } = await show({
    id: Number(params.id),
  });

  if (!blog) {
    return {
      title: "Blog not found | the-fullstack-app",
      description:
        "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
    };
  }

  return {
    title: `${blog.title} | the-fullstack-app`,
  };
}

interface BlogShowPageProps {
  params: {
    id: string;
  };
}

export default async function BlogShowPage({
  params: { id },
}: BlogShowPageProps) {
  const { data: blog } = await show({
    id: Number(id),
  });

  if (!blog) {
    return notFound();
  }

  return (
    <div className="py-4 space-y-4 max-w-2xl mx-auto px-4">
      <div className="w-full">
        <Blog blog={blog} />
      </div>
    </div>
  );
}
