import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const forumCommentReplyReadSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const show = async (
  _request: Request,
  context: z.infer<typeof forumCommentReplyReadSchema>
) => {
  const { params } = forumCommentReplyReadSchema.parse(context);

  return await prisma.forumCommentReply.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
          id: true,
        },
      },
    },
  });
};
