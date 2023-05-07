import { prisma } from "@/lib/prisma";

export const list = async () => {
  try {
    const forumComments = await prisma.forumComment.findMany();

    return {
      data: forumComments,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};
