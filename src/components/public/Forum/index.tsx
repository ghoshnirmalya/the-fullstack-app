import { ForumCommentCreateForm } from "@/components/public/Forum/ForumCommentCreateForm";
import { ForumComment, Forum as ForumEntity } from "@prisma/client";
import { ForumCommentCard } from "@/components/public/Forum/ForumCommentCard";

interface ForumProps {
  forum: ForumEntity & {
    comments: ForumComment[];
  };
}

export const Forum = ({ forum }: ForumProps) => {
  return (
    <div className="p-4 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl">{forum.title}</h1>
        <p className="text-gray-600">{forum.description}</p>
      </div>
      <ForumCommentCreateForm forum={forum} />
      <div className="space-y-4">
        {forum.comments.reverse().map((comment) => {
          return <ForumCommentCard forumComment={comment} key={comment.id} />;
        })}
      </div>
    </div>
  );
};
