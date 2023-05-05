import { blogReadSchema } from "@/controllers/blogs/show";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const destroy = async (
  _request: Request,
  context: z.infer<typeof blogReadSchema>
) => {
  const { params } = blogReadSchema.parse(context);

  return await prisma.blog.delete({
    where: {
      id: Number(params.id),
    },
  });
};
