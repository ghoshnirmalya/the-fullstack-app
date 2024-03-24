import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Blog } from "@prisma/client";
import Link from "next/link";

interface BlogCardProps {
  blog: Blog;
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Link href={`/blogs/${blog.id}`} className="block">
      <Card>
        <CardHeader>
          <CardTitle>{blog.title}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};
