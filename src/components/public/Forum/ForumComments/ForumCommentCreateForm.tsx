"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
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

        const forumCommentElement =
          document.getElementById("js-forum-comments");

        forumCommentElement?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
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
    <div className="border rounded-lg bg-white shadow-sm p-4">
      <form
        className="space-y-2 flex flex-col items-end"
        onSubmit={handleSubmit}
      >
        <Textarea id="content" name="content" disabled={isPending} required />
        <div className="space-x-2">
          <Button
            type="submit"
            className="w-full md:w-auto"
            size="sm"
            disabled={isMutating}
          >
            {isMutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Comment
          </Button>
        </div>
      </form>
    </div>
  );
};
