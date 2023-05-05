import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const forumReadSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const show = async (
  _request: Request,
  context: z.infer<typeof forumReadSchema>
) => {
  const { params } = forumReadSchema.parse(context);

  return await prisma.forum.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      comments: {
        include: {
          author: {
            select: {
              name: true,
              image: true,
              id: true,
            },
          },
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
      },
    },
  });
};
