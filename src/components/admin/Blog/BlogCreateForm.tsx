"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Editor } from "@/components/ui/editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export const BlogCreateForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSaving, setIsSaving] = useState(false);
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editable: true,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm focus:outline-none min-h-[400px] rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-full",
      },
    },
  });

  const isMutating = isSaving || isPending;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSaving(true);

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const content = editor?.getHTML();

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (response.ok) {
        const blog = await response.json();

        setIsSaving(false);

        startTransition(() => {
          router.refresh();

          router.push(`/admin/blogs/${blog.id}`);
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New blog</CardTitle>
        <CardDescription>
          Use the form below to create a new blog.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              disabled={isPending}
              required
            />
            <p className="text-sm text-muted-foreground">
              Title should be more than 4 characters.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="content">Content</Label>
            <Editor editor={editor} />
          </div>
          <Button type="submit" disabled={isMutating} className="w-full">
            {isMutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
