"use client";

import { EditorContent, Editor as EditorType } from "@tiptap/react";

interface EditorProps {
  editor: EditorType | null;
}

const Editor = ({ editor }: EditorProps) => {
  return <EditorContent editor={editor} />;
};

export { Editor };
