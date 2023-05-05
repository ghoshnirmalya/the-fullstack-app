import { forumCommentReplyReadSchema } from "@/controllers/forum-comment-replies/show";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const destroy = async (
  _request: Request,
  context: z.infer<typeof forumCommentReplyReadSchema>
) => {
  const { params } = forumCommentReplyReadSchema.parse(context);

  return await prisma.forumCommentReply.delete({
    where: {
      id: Number(params.id),
    },
  });
};
