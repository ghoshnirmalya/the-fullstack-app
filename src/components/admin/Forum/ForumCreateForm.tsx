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
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export const ForumCreateForm = async () => {
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

  const handleSubmit = async (formData: FormData) => {
    "use server";

    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Unauthorized");
    }

    const forum = await prisma.forum.create({
      data: {
        title: String(formData.get("title")),
        content: String(editor?.getHTML()),
        creatorId: session.user.id,
      },
    });

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
        <form className="space-y-8" action={handleSubmit}>
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
