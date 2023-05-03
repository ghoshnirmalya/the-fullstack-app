"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export const ForumCreateForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsFetching(true);

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

        setIsFetching(false);

        startTransition(() => {
          router.refresh();

          router.push(`/forums/${forum.id}`);
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add new forum</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
