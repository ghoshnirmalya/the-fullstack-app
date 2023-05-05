import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const blogReadSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const show = async (
  _request: Request,
  context: z.infer<typeof blogReadSchema>
) => {
  const { params } = blogReadSchema.parse(context);

  return await prisma.blog.findUnique({
    where: {
      id: Number(params.id),
    },
  });
};
