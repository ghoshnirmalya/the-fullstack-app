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
    <div className="gap-4 flex flex-col lg:flex-row">
      <div className="space-y-4 w-full lg:w-1/3 sticky top-4 h-full">
        <h1 className="text-2xl">{forum.title}</h1>
        <p className="text-gray-600">{forum.description}</p>
      </div>
      <div className="space-y-4 w-full lg:w-2/3">
        <ForumCommentCreateForm forum={forum} />
        <ForumComments forum={forum} />
      </div>
    </div>
  );
};
