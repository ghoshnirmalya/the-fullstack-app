import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { forumCommentCreateSchema } from "@/controllers/forums/create";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { z } from "zod";

export const ForumCreateForm = async () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";

    // const session = await getServerSession(authOptions);

    // if (!session) {
    //   throw new Error("Unauthorized");
    // }

    // const forum = await prisma.forum.create({
    //   data: {
    //     title: String(formData.get("title")),
    //     description: String(formData.get("description")),
    //     creatorId: session.user.id,
    //   },
    // });

    // redirect(`/admin/forums//${forum.id}`);

    try {
      const session = await getServerSession(authOptions);

      if (!session) {
        throw new Error("Unauthorized");
      }

      const data = Object.fromEntries(formData.entries());

      const { title, description } = forumCommentCreateSchema.parse(data);

      const forum = await prisma.forum.create({
        data: {
          title,
          description,
          creatorId: session.user.id,
        },
      });

      redirect(`/admin/forums/${forum.id}`);
    } catch (error) {
      console.log(error);

      if (error instanceof z.ZodError) {
        throw new Error(JSON.stringify(error.issues));
      }

      throw new Error("Something went wrong.");
    }
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
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" />
          </div>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
