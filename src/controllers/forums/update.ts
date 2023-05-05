import { forumReadSchema } from "@/controllers/forums/show";
import { prisma } from "@/lib/prisma";
import { Forum } from "@prisma/client";
import { z } from "zod";

export const forumUpdateSchema = z.object({
  title: z.string().min(5),
  description: z.string().optional(),
});

export const update = async (
  request: Request,
  context: z.infer<typeof forumReadSchema>
) => {
  const data: Forum = await request.json();

  const { params } = forumReadSchema.parse(context);
  const { title, description } = forumUpdateSchema.parse(data);

  return await prisma.forum.update({
    where: {
      id: Number(params.id),
    },
    data: {
      title,
      description,
    },
  });
};
