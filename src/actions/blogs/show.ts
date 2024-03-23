import { prisma } from "@/lib/prisma";
import { Blog } from "@prisma/client";
import { z } from "zod";

export const blogReadSchema = z.object({
  id: z.number().min(1),
});

export const show = async ({ id }: { id: Blog["id"] }) => {
  try {
    const data = blogReadSchema.parse({ id });

    const blog = await prisma.blog.findUnique({
      where: {
        id: data.id,
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
