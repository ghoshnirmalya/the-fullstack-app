import { ForumCommentCreateForm } from "@/components/public/Forum/ForumCommentCreateForm";
import { ForumComments } from "@/components/public/Forum/ForumComments";
import { ForumComment, Forum as ForumEntity } from "@prisma/client";

interface ForumProps {
  forum:
    | ForumEntity & {
        comments: (ForumComment & {
          author: {
            id: string;
            image: string | null;
            name: string | null;
          };
        })[];
      };
}

export const Forum = ({ forum }: ForumProps) => {
  return (
    <div className="gap-4 flex flex-col lg:flex-row">
      <div className="w-full lg:w-2/3">
        <div className="space-y-2">
          <h1 className="text-2xl">{forum.title}</h1>
          <p className="text-gray-600">{forum.description}</p>
        </div>
        <div className="space-y-4">
          <ForumComments forum={forum} />
          <ForumCommentCreateForm forum={forum} />
        </div>
      </div>
      <div className="space-y-4 w-full lg:w-1/3">
        <div className="border rounded-md text-sm overflow-hidden shadow-sm sticky top-4">
          <div className="p-4 border-b bg-gray-50 font-bold">
            Meta information
          </div>
          <div className="px-4 py-2 border-b space-y-1">
            <div className="text-muted-foreground">Category</div>
            <div>One</div>
          </div>
          <div className="px-4 py-2 border-b space-y-1">
            <div className="text-muted-foreground">Label</div>
            <div>One</div>
          </div>
          <div className="px-4 py-2 border-b space-y-1">
            <div className="text-muted-foreground">Participants</div>
            <div>31</div>
          </div>
        </div>
      </div>
    </div>
  );
};
