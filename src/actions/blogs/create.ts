import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Blog } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

export const blogCreateSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(5),
});

export const create = async ({
  title,
  content,
}: {
  title: Blog["title"];
  content: Blog["content"];
}) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Unauthorized");
    }

    const data = blogCreateSchema.parse({
      title,
      content,
    });

    const blog = await prisma.blog.create({
      data: {
        title: data.title,
        content: data.content,
        creatorId: session.user.id,
      },
    });

    return {
      data: blog,
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
