import { ForumCommentReplyCard } from "@/components/public/Forum/ForumComments/ForumCommentReplies/ForumCommentReplyCard";
import { show } from "@/controllers/forums/show";
import { AsyncReturnType } from "@/lib/get-async-promise-return-type";

interface ForumCommentRepliesProps {
  forumComment: NonNullable<AsyncReturnType<typeof show>>["comments"][number];
}

export const ForumCommentReplies = ({
  forumComment,
}: ForumCommentRepliesProps) => {
  if (!forumComment.forumCommentReplies?.length) {
    return (
      <p className="p-4 pb-0 bg-gray-50">
        No replies yet. Be the first to reply to this comment.
      </p>
    );
  }

  return (
    <div className="pt-4 px-4 bg-gray-50">
      {forumComment.forumCommentReplies.map((reply) => {
        return (
          <ForumCommentReplyCard
            forumCommentReply={reply}
            key={forumComment.id}
          />
        );
      })}
    </div>
  );
};
