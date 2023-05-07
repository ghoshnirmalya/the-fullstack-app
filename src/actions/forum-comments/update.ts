import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ForumComment } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

export const forumCommentsUpdateSchema = z.object({
  id: z.number().min(1),
  content: z.string().min(5),
});

export const update = async ({
  id,
  content,
}: {
  id: ForumComment["id"];
  content: ForumComment["content"];
}) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Unauthorized");
    }

    const data = forumCommentsUpdateSchema.parse({
      id,
      content,
    });

    const forumComment = await prisma.forumComment.update({
      where: {
        id: data.id,
      },
      data: {
        content: data.content,
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
