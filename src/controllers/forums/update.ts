import { forumReadSchema } from "@/controllers/forums/show";
import { prisma } from "@/lib/prisma";
import { Forum } from "@prisma/client";
import { z } from "zod";

export const forumUpdateSchema = z.object({
  title: z.string().min(5),
  content: z.any().optional(),
});

export const update = async (
  request: Request,
  context: z.infer<typeof forumReadSchema>
) => {
  const data: Forum = await request.json();

  const { params } = forumReadSchema.parse(context);
  const { title, content } = forumUpdateSchema.parse(data);

  return await prisma.forum.update({
    where: {
      id: Number(params.id),
    },
    data: {
      title,
      content,
    },
  });
};
