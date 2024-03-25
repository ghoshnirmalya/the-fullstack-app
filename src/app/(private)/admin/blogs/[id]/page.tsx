import { show } from "@/actions/blogs/show";
import { BlogEditForm } from "@/components/admin/Blog/BlogEditForm";
import { Metadata } from "next";

interface GenerateMetadataProps {
  params: {
    id: string;
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
      title: "Blog not found | Admin | the-fullstack-app",
      description:
        "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
    };
  }

  return {
    title: `${blog.title} | Admin | the-fullstack-app`,
  };
}

interface IndexPageProps {
  params: {
    id: string;
  };
}

export default async function BlogShowPage({ params: { id } }: IndexPageProps) {
  return (
    <div className="p-4 space-y-4 container mx-auto">
      <div className="w-full">
        <BlogEditForm blogId={Number(id)} />
      </div>
    </div>
  );
}
