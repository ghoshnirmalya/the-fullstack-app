"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Forum } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface ForumCommentCreateFormProps {
  forum: Forum;
}

export const ForumCommentCreateForm = ({
  forum,
}: ForumCommentCreateFormProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  if (status === "loading") {
    return null;
  }

  if (!session) {
    return (
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4">
            <p className="text-sm">You must be signed in to add a comment.</p>
            <Button
              className="w-full"
              onClick={() => router.push("/api/auth/signin")}
            >
              Sign in
            </Button>
          </div>
        </CardHeader>
      </Card>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsFetching(true);

    const formData = new FormData(event.currentTarget);
    const content = formData.get("content") as string;

    try {
      const response = await fetch("/api/forum-comments", {
        method: "POST",
        body: JSON.stringify({
          content,
          forumId: forum.id,
        }),
      });

      if (response.ok) {
        await response.json();

        setIsFetching(false);

        startTransition(() => {
          router.refresh();
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
        <CardTitle>Add comment</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="content">Comment</Label>
            <Textarea id="content" name="content" disabled={isPending} />
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
