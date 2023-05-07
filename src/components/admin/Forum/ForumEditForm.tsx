"use client";

import { destroy, update } from "@/actions/forums";
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
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

interface ForumEditFormProps {
  forum: Forum;
}

export const ForumEditForm = ({ forum }: ForumEditFormProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const editor = useEditor({
    extensions: [StarterKit],
    content: "" as Content,
    editable: true,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm focus:outline-none min-h-[400px] rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-full",
      },
    },
  });

  if (status === "loading") {
    return null;
  }

  const handleEdit = async (formData: FormData) => {
    if (!session) {
      throw new Error("Unauthorized");
    }

    await update({
      id: Number(forum.id),
      title: String(formData.get("title")),
      content: String(editor?.getHTML()),
      session,
    });

    router.refresh();

    redirect(`/admin/forums`);
  };

  const handleDelete = async () => {
    if (!session) {
      throw new Error("Unauthorized");
    }

    await destroy({
      id: Number(forum.id),
    });

    router.refresh();

    redirect(`/admin/forums`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{forum.title}</CardTitle>
        <CardDescription>Use the form below to edit the forum.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-8" action={handleEdit}>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              defaultValue={forum.title}
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
            <Button type="submit" className="w-4/5">
              Save
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              className="w-1/5"
            >
              Delete
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
