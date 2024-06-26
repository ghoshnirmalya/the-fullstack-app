import { create } from "@/actions/blogs/create";
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
import isEmpty from "lodash/isEmpty";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const BlogCreateForm = async () => {
  const handleCreate = async (formData: FormData) => {
    "use server";

    const { data: blog, error } = await create({
      title: String(formData.get("title")),
      content: String(formData.get("content")),
    });

    if (!error && !isEmpty(blog)) {
      revalidatePath(`/admin/blogs`);
      redirect(`/admin/blogs/${blog.id}`);
    }

    if (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a new blog</CardTitle>
        <CardDescription>
          Use the form below to create a new blog.
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
            <BlogTextEditor />
          </div>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
