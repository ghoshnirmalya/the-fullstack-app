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
import { Forum } from "@prisma/client";
import { Content, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface ForumEditFormProps {
  forum: Forum;
}

export const ForumEditForm = ({ forum }: ForumEditFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const editor = useEditor({
    extensions: [StarterKit],
    content: forum.content as Content,
    editable: true,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm focus:outline-none min-h-[400px] rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-full",
      },
    },
  });

  const isMutating = isSaving || isPending || isDeleting;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSaving(true);

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const content = editor?.getHTML();

    try {
      await fetch(`/api/forums/${forum.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title,
          content,
        }),
      });

      setIsSaving(false);

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await fetch(`/api/forums/${forum.id}`, {
        method: "DELETE",
      });

      setIsDeleting(false);

      router.push("/forums");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{forum.title}</CardTitle>
        <CardDescription>Use the form below to edit the forum.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              defaultValue={forum.title}
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
          <div className="flex justify-between space-x-4">
            <Button type="submit" disabled={isMutating} className="w-4/5">
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isMutating}
              className="w-1/5"
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
