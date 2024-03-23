"use client";

import { ForumComments } from "@/components/public/Forum/ForumComments";
import { ForumCommentCreateForm } from "@/components/public/Forum/ForumComments/ForumCommentCreateForm";
import { show } from "@/controllers/forums/show";
import { AsyncReturnType } from "@/lib/get-async-promise-return-type";
import ReactMarkdown from "react-markdown";

interface ForumProps {
  forum: NonNullable<AsyncReturnType<typeof show>>;
}

export const Forum = ({ forum }: ForumProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-4xl lg:text-6xl">{forum.title}</h1>
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
