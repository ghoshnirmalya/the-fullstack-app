import { prisma } from "@/lib/prisma";

export const list = async () => {
  try {
    const forums = await prisma.forum.findMany();

    return {
      data: forums,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};
