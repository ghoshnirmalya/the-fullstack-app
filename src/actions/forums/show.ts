import { prisma } from "@/lib/prisma";
import { Forum } from "@prisma/client";
import { z } from "zod";

export const forumReadSchema = z.object({
  id: z.number().min(1),
});

export const show = async ({ id }: { id: Forum["id"] }) => {
  try {
    const data = forumReadSchema.parse({ id });

    const forum = await prisma.forum.findUnique({
      where: {
        id: data.id,
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

    return {
      data: forum,
      error: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        data: null,
        error: error.errors,
      };
    }

    return {
      data: null,
      error,
    };
  }
};
