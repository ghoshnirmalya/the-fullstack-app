import { ForumCommentCreateForm } from "@/components/public/Forum/ForumCommentCreateForm";
import { ForumComments } from "@/components/public/Forum/ForumComments";
import { ForumComment, Forum as ForumEntity } from "@prisma/client";

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
      <ForumComments forum={forum} />
    </div>
  );
};
