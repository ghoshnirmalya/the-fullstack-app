import { prisma } from "@/lib/prisma";
import { ForumComment } from "@prisma/client";
import { z } from "zod";

export const forumCommentReadSchema = z.object({
  id: z.number().min(1),
});

export const show = async ({ id }: { id: ForumComment["id"] }) => {
  try {
    const data = forumCommentReadSchema.parse({ id });

    const forumComment = await prisma.forumComment.findUnique({
      where: {
        id: data.id,
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

    return {
      data: forumComment,
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
