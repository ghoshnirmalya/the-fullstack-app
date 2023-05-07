import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Forum } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

export const forumCreateSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(5),
});

export const create = async ({
  title,
  content,
}: {
  title: Forum["title"];
  content: Forum["content"];
}) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Unauthorized");
    }

    const data = forumCreateSchema.parse({
      title,
      content,
    });

    const forum = await prisma.forum.create({
      data: {
        title: data.title,
        content: data.content,
        creatorId: session.user.id,
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
