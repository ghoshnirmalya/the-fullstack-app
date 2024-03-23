import { destroy } from "@/actions/blogs/destroy";
import { show } from "@/actions/blogs/show";
import { update } from "@/actions/blogs/update";
import { BlogTextEditor } from "@/components/admin/Blog/BlogTextEditor";
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
import { Blog } from "@prisma/client";
import { isEmpty } from "lodash";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

interface BlogEditFormProps {
  blogId: Blog["id"];
}

export const BlogEditForm = async ({ blogId }: BlogEditFormProps) => {
  const { data: blog } = await show({
    id: Number(blogId),
  });

  if (!blog) {
    return notFound();
  }

  const handleEdit = async (formData: FormData) => {
    "use server";

    const { error } = await update({
      id: Number(blog.id),
      title: String(formData.get("title")),
      content: String(formData.get("content")),
    });

    if (!error && !isEmpty(blog)) {
      revalidatePath(`/admin/blogs/${blog.id}`);
      redirect(`/admin/blogs`);
    }

    if (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    "use server";

    try {
      await destroy({
        id: Number(blog.id),
      });

      redirect(`/admin/blogs`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{blog.title}</CardTitle>
        <CardDescription>Use the form below to edit the blog.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-8" action={handleEdit} id="myForm">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              defaultValue={blog.title}
              required
            />
            <p className="text-sm text-muted-foreground">
              Title should be more than 4 characters.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="content">Content</Label>
            <BlogTextEditor blogContent={blog.content} />
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
