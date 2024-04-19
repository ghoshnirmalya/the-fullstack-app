"use client";

import { show } from "@/controllers/blogs/show";
import { AsyncReturnType } from "@/lib/get-async-promise-return-type";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";

interface BlogProps {
  blog: NonNullable<AsyncReturnType<typeof show>>;
}

export const Blog = ({ blog }: BlogProps) => {
  return (
    <div className="space-y-16 py-16">
      <div className="space-y-16">
        <div className="space-y-4">
          <h1 className="text-2xl lg:text-4xl font-bold">{blog.title}</h1>
          <div className="text-sm">
            Posted on{" "}
            {format(new Date(String(blog.createdAt)), "do MMMM, yyyy")}
          </div>
        </div>

        <ReactMarkdown className="prose dark:prose-invert">
          {blog.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
