import { ForumCommentCard } from "@/components/public/Forum/ForumComments/ForumCommentCard";
import { ForumComment, Forum as ForumEntity } from "@prisma/client";

interface ForumCommentsProps {
  forum: ForumEntity & {
    comments: ForumComment[];
  };
}

export const ForumComments = ({ forum }: ForumCommentsProps) => {
  if (!forum.comments.length) {
    return <p>No comments yet. Be the first to comment on this forum.</p>;
  }

  return (
    <div className="space-y-4">
      {forum.comments.reverse().map((comment) => {
        return <ForumCommentCard forumComment={comment} key={comment.id} />;
      })}
    </div>
  );
};
