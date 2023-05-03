import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ForumComment } from "@prisma/client";

interface ForumCommentCardProps {
  forumComment: ForumComment;
}

export const ForumCommentCard = ({ forumComment }: ForumCommentCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription>{forumComment.content}</CardDescription>
      </CardHeader>
    </Card>
  );
};
