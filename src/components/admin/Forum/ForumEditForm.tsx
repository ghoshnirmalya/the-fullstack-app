import { destroy } from "@/actions/forums/destroy";
import { show } from "@/actions/forums/show";
import { update } from "@/actions/forums/update";
import { ForumTextEditor } from "@/components/admin/Forum/ForumTextEditor";
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
import { Forum } from "@prisma/client";
import { isEmpty } from "lodash";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

interface ForumEditFormProps {
  forumId: Forum["id"];
}

export const ForumEditForm = async ({ forumId }: ForumEditFormProps) => {
  const { data: forum } = await show({
    id: Number(forumId),
  });

  if (!forum) {
    return notFound();
  }

  const handleEdit = async (formData: FormData) => {
    "use server";

    const { error } = await update({
      id: Number(forum.id),
      title: String(formData.get("title")),
      content: String(formData.get("content")),
    });

    if (!error && !isEmpty(forum)) {
      revalidatePath(`/admin/forums/${forum.id}`);
      redirect(`/admin/forums`);
    }

    if (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    "use server";

    try {
      await destroy({
        id: Number(forum.id),
      });

      redirect(`/admin/forums`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{forum.title}</CardTitle>
        <CardDescription>Use the form below to edit the forum.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-8" action={handleEdit} id="myForm">
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
            <ForumTextEditor forumContent={forum.content} />
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
