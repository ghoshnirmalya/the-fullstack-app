import { forumReadSchema } from "@/controllers/forums/show";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const destroy = async (
  _request: Request,
  context: z.infer<typeof forumReadSchema>
) => {
  const { params } = forumReadSchema.parse(context);

  return await prisma.forum.delete({
    where: {
      id: Number(params.id),
    },
  });
};
