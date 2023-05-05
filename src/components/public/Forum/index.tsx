"use client";

import { ForumComments } from "@/components/public/Forum/ForumComments";
import { ForumCommentCreateForm } from "@/components/public/Forum/ForumComments/ForumCommentCreateForm";
import { Editor } from "@/components/ui/editor";
import { show } from "@/controllers/forums/show";
import { AsyncReturnType } from "@/lib/get-async-promise-return-type";
import { Content, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface ForumProps {
  forum: NonNullable<AsyncReturnType<typeof show>>;
}

export const Forum = ({ forum }: ForumProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: forum.content as Content,
    editable: false,
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert",
      },
    },
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-4xl lg:text-6xl">{forum.title}</h1>
        <Editor editor={editor} />
      </div>
      <div className="space-y-4">
        <ForumComments forum={forum} />
        <ForumCommentCreateForm forum={forum} />
      </div>
    </div>
  );
};
