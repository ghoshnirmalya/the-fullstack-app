"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface ProjectEditFormProps {
  project: Project;
}

export const ProjectEditForm = ({ project }: ProjectEditFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isMutating = isFetching || isPending || isDeleting;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsFetching(true);

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    try {
      await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title,
          description,
        }),
      });

      setIsFetching(false);

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await fetch(`/api/projects/${project.id}`, {
        method: "DELETE",
      });

      setIsDeleting(false);

      router.push("/projects");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
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
              disabled={isPending}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={project.description || ""}
              disabled={isPending}
            />
          </div>
          <div className="flex justify-between space-x-4">
            <Button type="submit" disabled={isMutating}>
              Save
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isMutating}
            >
              Delete
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
