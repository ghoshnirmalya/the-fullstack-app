"use client";

import { create } from "@/actions/forums";
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
import { Content, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export const ForumCreateForm = () => {
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

  const handleCreate = async (formData: FormData) => {
    if (!session) {
      throw new Error("Unauthorized");
    }

    const forum = await create({
      title: String(formData.get("title")),
      content: String(editor?.getHTML()),
      session,
    });

    router.refresh();

    redirect(`/admin/forums/${forum.id}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New forum</CardTitle>
        <CardDescription>
          Use the form below to create a new forum.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-8" action={handleCreate}>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" name="title" required />
            <p className="text-sm text-muted-foreground">
              Title should be more than 4 characters.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="content">Content</Label>
            <Editor editor={editor} />
          </div>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
