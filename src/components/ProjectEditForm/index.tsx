"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ProjectEditFormProps {
  project: Project;
}

export const ProjectEditForm = ({ project }: ProjectEditFormProps) => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    try {
      await fetch(`http://localhost:3000/api/projects/${project.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title,
          description,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3000/api/projects/${project.id}`, {
        method: "DELETE",
      });

      router.push("/projects");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add new project</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              defaultValue={project.title}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={project.description || ""}
            />
          </div>
          <div className="flex justify-between space-x-4">
            <Button type="submit">Save</Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
