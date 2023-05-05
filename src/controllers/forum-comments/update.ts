import { forumCommentReadSchema } from "@/controllers/forum-comments/show";
import { prisma } from "@/lib/prisma";
import { Forum } from "@prisma/client";
import { z } from "zod";

export const forumCommentUpdateSchema = z.object({
  content: z.string().min(5),
});

export const update = async (
  request: Request,
  context: z.infer<typeof forumCommentReadSchema>
) => {
  const data: Forum = await request.json();

  const { params } = forumCommentReadSchema.parse(context);
  const { content } = forumCommentUpdateSchema.parse(data);

  return await prisma.forumComment.update({
    where: {
      id: Number(params.id),
    },
    data: {
      content,
    },
  });
};
