import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Blog } from "@prisma/client";
import { format } from "date-fns";
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
          <CardDescription>
            {format(new Date(String(blog.createdAt)), "do MMMM, yyyy")}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
