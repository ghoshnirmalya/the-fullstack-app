import { ForumCommentReplyCreateForm } from "@/components/public/Forum/ForumComments/ForumCommentReplies/ForumCommentReplyCreateForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { show } from "@/controllers/forums/show";
import { AsyncReturnType } from "@/lib/get-async-promise-return-type";
import { ForumCommentReplies } from "./ForumCommentReplies";

interface ForumCommentCardProps {
  forumComment: NonNullable<AsyncReturnType<typeof show>>["comments"][number];
  forum: NonNullable<AsyncReturnType<typeof show>>;
}

export const ForumCommentCard = ({
  forumComment,
  forum,
}: ForumCommentCardProps) => {
  return (
    <div className="pt-4" id={`forum-comment-${forumComment.id}`}>
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
        <ForumCommentReplies forumComment={forumComment} />
        <ForumCommentReplyCreateForm
          forum={forum}
          forumComment={forumComment}
        />
      </div>
    </div>
  );
};
