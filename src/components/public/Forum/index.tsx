"use client";

import { ForumComments } from "@/components/public/Forum/ForumComments";
import { ForumCommentCreateForm } from "@/components/public/Forum/ForumComments/ForumCommentCreateForm";
import { show } from "@/controllers/forums/show";
import { AsyncReturnType } from "@/lib/get-async-promise-return-type";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";

interface ForumProps {
  forum: NonNullable<AsyncReturnType<typeof show>>;
}

export const Forum = ({ forum }: ForumProps) => {
  return (
    <div className="space-y-16 py-16">
      <div className="space-y-16">
        <div className="space-y-4">
          <h1 className="text-2xl lg:text-4xl font-bold">{forum.title}</h1>
          <div className="text-sm">
            Posted on{" "}
            {format(new Date(String(forum.createdAt)), "do MMMM, yyyy")}
          </div>
        </div>

        <ReactMarkdown className="prose dark:prose-invert">
          {forum.content}
        </ReactMarkdown>
      </div>
      <div className="space-y-4">
        <ForumComments forum={forum} />
        <ForumCommentCreateForm forum={forum} />
      </div>
    </div>
  );
};
