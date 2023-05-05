"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { show } from "@/controllers/forums/show";
import { AsyncReturnType } from "@/lib/get-async-promise-return-type";
import { cn } from "@/lib/tailwind-utils";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface ForumCommentReplyCreateFormProps {
  forumComment: NonNullable<AsyncReturnType<typeof show>>["comments"][number];
  forum: NonNullable<AsyncReturnType<typeof show>>;
}

export const ForumCommentReplyCreateForm = ({
  forum,
  forumComment,
}: ForumCommentReplyCreateFormProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [isReplyFormVisible, setReplyFormVisible] = useState(false);
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
      const response = await fetch("/api/forum-comment-replies", {
        method: "POST",
        body: JSON.stringify({
          content,
          forumId: forum.id,
          forumCommentId: forumComment.id,
        }),
      });

      if (response.ok) {
        await response.json();

        setIsFetching(false);

        startTransition(() => {
          router.refresh();
        });

        const forumCommentElement = document.getElementById(
          `forum-comment-${forumComment.id}`
        );

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
    <div
      className={cn("p-4 bg-gray-50", {
        "border-t": !!forumComment.forumCommentReplies.length,
      })}
    >
      <form
        className="space-y-2 flex flex-col items-end"
        onSubmit={handleSubmit}
      >
        <Textarea
          id="content"
          name="content"
          className={cn("h-10 bg-white", {
            "h-24": isReplyFormVisible,
          })}
          onClick={() => {
            if (!isReplyFormVisible) {
              setReplyFormVisible(true);
            }
          }}
          required
          disabled={isMutating}
        />
        <div
          className={cn("space-x-2 hidden", {
            flex: isReplyFormVisible,
          })}
        >
          <Button
            type="button"
            className="w-full md:w-auto"
            size="sm"
            variant="outline"
            onClick={() => {
              setReplyFormVisible(false);
            }}
            disabled={isMutating}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full md:w-auto"
            size="sm"
            disabled={isMutating}
          >
            {isMutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reply
          </Button>
        </div>
      </form>
    </div>
  );
};
