import { ForumCommentCard } from "@/components/public/Forum/ForumComments/ForumCommentCard";
import { show } from "@/controllers/forums/show";
import { AsyncReturnType } from "@/lib/get-async-promise-return-type";

interface ForumCommentsProps {
  forum: NonNullable<AsyncReturnType<typeof show>>;
}

export const ForumComments = ({ forum }: ForumCommentsProps) => {
  if (!forum.comments?.length) {
    return <p>No comments yet. Be the first to comment on this forum.</p>;
  }

  return (
    <div className="pt-4" id="js-forum-comments">
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
