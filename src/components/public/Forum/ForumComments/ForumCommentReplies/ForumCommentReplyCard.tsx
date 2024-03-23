import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { show } from "@/controllers/forums/show";
import { AsyncReturnType } from "@/lib/get-async-promise-return-type";
import { format } from "date-fns";

interface ForumCommentReplyCardProps {
  forumCommentReply: NonNullable<
    AsyncReturnType<typeof show>
  >["comments"][number]["forumCommentReplies"][number];
}

export const ForumCommentReplyCard = ({
  forumCommentReply,
}: ForumCommentReplyCardProps) => {
  return (
    <div
      key={forumCommentReply.id}
      className="rounded-md overflow-hidden relative pb-4"
    >
      <div className="h-full w-px bg-border absolute left-3"></div>
      <div className="text-sm space-x-1 flex items-center bg-gray-50">
        <Avatar className="w-6 h-6 border">
          {forumCommentReply?.author?.image && (
            <AvatarImage
              src={forumCommentReply?.author?.image}
              width={32}
              height={32}
            />
          )}
          <AvatarFallback>
            {forumCommentReply?.author?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="font-bold">{forumCommentReply.author.name}</span>
        <div>
          on{" "}
          {format(
            new Date(String(forumCommentReply.createdAt)),
            "do MMMM, yyyy",
          )}
        </div>
      </div>
      <div className="py-2 mx-7">{forumCommentReply.content}</div>
    </div>
  );
};
