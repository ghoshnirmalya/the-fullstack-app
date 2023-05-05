"use client";

import { Editor } from "@/components/ui/editor";
import { show } from "@/controllers/blogs/show";
import { AsyncReturnType } from "@/lib/get-async-promise-return-type";
import { Content, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface BlogProps {
  blog: NonNullable<AsyncReturnType<typeof show>>;
}

export const Blog = ({ blog }: BlogProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: blog.content as Content,
    editable: false,
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert",
      },
    },
  });

  return (
    <div className="gap-4">
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-6xl">{blog.title}</h1>
        <Editor editor={editor} />
      </div>
    </div>
  );
};
