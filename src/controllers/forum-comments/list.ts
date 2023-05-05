import { prisma } from "@/lib/prisma";

export const list = async () => {
  return await prisma.forumComment.findMany();
};
