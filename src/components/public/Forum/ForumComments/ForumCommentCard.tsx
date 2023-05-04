"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/tailwind-utils";
import { Forum, ForumComment } from "@prisma/client";
import { useState } from "react";

interface ForumCommentCardProps {
  forumComment: ForumComment & {
    author: {
      id: string;
      image: string | null;
      name: string | null;
    };
  };
  forum:
    | Forum & {
        comments: (ForumComment & {
          author: {
            id: string;
            image: string | null;
            name: string | null;
          };
        })[];
      };
}

export const ForumCommentCard = ({
  forumComment,
  forum,
}: ForumCommentCardProps) => {
  const [isReplyFormVisible, setReplyFormVisible] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
      <div className="p-4 border-b text-sm space-x-1 flex items-center bg-gray-50">
        <Avatar className="w-6 h-6 border">
          {forumComment?.author?.image && (
            <AvatarImage
              src={forumComment?.author?.image}
              width={32}
              height={32}
            />
          )}
          <AvatarFallback>
            {forumComment?.author?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="font-bold">{forumComment.author.name}</span>
        <div>on {String(forumComment.createdAt)}</div>
      </div>
      <div className="p-4 border-b">{forumComment.content}</div>
      <div className="p-4 bg-gray-50">
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
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full md:w-auto" size="sm">
              Reply
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
