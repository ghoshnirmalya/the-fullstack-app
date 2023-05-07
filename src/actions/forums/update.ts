import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Forum } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

export const forumUpdateSchema = z.object({
  id: z.number().min(1),
  title: z.string().min(5),
  content: z.string().min(5),
});

export const update = async ({
  id,
  title,
  content,
}: {
  id: Forum["id"];
  title: Forum["title"];
  content: Forum["content"];
}) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Unauthorized");
    }

    const data = forumUpdateSchema.parse({
      id,
      title,
      content,
    });

    const forum = await prisma.forum.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        content: data.content,
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
