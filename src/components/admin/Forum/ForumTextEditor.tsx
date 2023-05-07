"use client";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface ForumEditFormProps {
  forumContent?: string;
}

export const ForumTextEditor = ({ forumContent = "" }: ForumEditFormProps) => {
  const [value, setValue] = useState<typeof forumContent>(forumContent);

  return (
    <div className="gap-4 flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2">
        <Textarea
          id="content"
          name="content"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          required
          className="h-[400px] bg-white"
        />
      </div>
      <div className="w-full lg:w-1/2">
        <ReactMarkdown className="prose dark:prose-invert prose-sm focus:outline-none min-h-[400px] rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-full bg-white">
          {value}
        </ReactMarkdown>
      </div>
    </div>
  );
};
