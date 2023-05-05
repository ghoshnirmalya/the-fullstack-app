"use client";

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
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export const ForumCreateForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSaving, setIsSaving] = useState(false);
  const isMutating = isSaving || isPending;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSaving(true);

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    try {
      const response = await fetch("/api/forums", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (response.ok) {
        const forum = await response.json();

        setIsSaving(false);

        startTransition(() => {
          router.refresh();

          router.push(`/admin/forums/${forum.id}`);
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
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
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              disabled={isPending}
              required
            />
            <p className="text-sm text-muted-foreground">
              Title should be more than 4 characters.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              disabled={isPending}
            />
          </div>
          <Button type="submit" disabled={isMutating} className="w-full">
            {isMutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};