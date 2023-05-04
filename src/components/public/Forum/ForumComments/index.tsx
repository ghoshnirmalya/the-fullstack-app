import { ForumCommentCard } from "@/components/public/Forum/ForumComments/ForumCommentCard";
import { ForumComment, Forum } from "@prisma/client";

interface ForumCommentsProps {
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

export const ForumComments = ({ forum }: ForumCommentsProps) => {
  if (!forum.comments.length) {
    return <p>No comments yet. Be the first to comment on this forum.</p>;
  }

  return (
    <div className="space-y-4 pt-4" id="js-forum-comments">
      {forum.comments.reverse().map((comment) => {
        return (
          <ForumCommentCard
            forumComment={comment}
            forum={forum}
            key={comment.id}
          />
        );
      })}
    </div>
  );
};
