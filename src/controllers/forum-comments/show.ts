import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const forumCommentReadSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const show = async (
  _request: Request,
  context: z.infer<typeof forumCommentReadSchema>
) => {
  const { params } = forumCommentReadSchema.parse(context);

  return await prisma.forumComment.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      forumCommentReplies: {
        include: {
          author: {
            select: {
              name: true,
              image: true,
              id: true,
            },
          },
        },
      },
    },
  });
};
