import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Forum } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

export const forumCommentCreateSchema = z.object({
  content: z.string().min(5),
  forumId: z.number().min(1),
});

export const create = async ({
  content,
  forumId,
}: {
  content: Forum["content"];
  forumId: Forum["id"];
}) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Unauthorized");
    }

    const data = forumCommentCreateSchema.parse({
      content,
      forumId,
    });

    const forumComment = await prisma.forumComment.create({
      data: {
        content: data.content,
        authorId: session.user.id,
        forumId,
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
