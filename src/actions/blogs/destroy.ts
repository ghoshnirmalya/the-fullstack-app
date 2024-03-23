import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Blog } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

export const blogDestroySchema = z.object({
  id: z.number().min(1),
});

export const destroy = async ({ id }: { id: Blog["id"] }) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Unauthorized");
    }

    const data = blogDestroySchema.parse({
      id,
    });

    await prisma.blog.delete({
      where: {
        id: data.id,
      },
    });

    return {
      data: null,
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
