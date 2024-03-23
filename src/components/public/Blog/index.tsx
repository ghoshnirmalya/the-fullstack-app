"use client";

import { show } from "@/controllers/blogs/show";
import { AsyncReturnType } from "@/lib/get-async-promise-return-type";
import ReactMarkdown from "react-markdown";

interface BlogProps {
  blog: NonNullable<AsyncReturnType<typeof show>>;
}

export const Blog = ({ blog }: BlogProps) => {
  return (
    <div className="gap-4">
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-6xl">{blog.title}</h1>
        <ReactMarkdown className="prose dark:prose-invert">
          {blog.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
