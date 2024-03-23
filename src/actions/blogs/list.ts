import { prisma } from "@/lib/prisma";

export const list = async () => {
  try {
    const blogs = await prisma.blog.findMany();

    return {
      data: blogs,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};
