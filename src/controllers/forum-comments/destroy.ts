import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { forumCommentReadSchema } from "@/controllers/forum-comments/show";

export const destroy = async (
  _request: Request,
  context: z.infer<typeof forumCommentReadSchema>
) => {
  const { params } = forumCommentReadSchema.parse(context);

  return await prisma.forumComment.delete({
    where: {
      id: Number(params.id),
    },
  });
};
