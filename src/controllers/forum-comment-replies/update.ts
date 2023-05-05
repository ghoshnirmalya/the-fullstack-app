import { prisma } from "@/lib/prisma";
import { Forum } from "@prisma/client";
import { z } from "zod";
import { forumCommentReplyReadSchema } from "@/controllers/forum-comment-replies/show";

export const forumCommentReplyUpdateSchema = z.object({
  content: z.string().min(5),
});

export const update = async (
  request: Request,
  context: z.infer<typeof forumCommentReplyReadSchema>
) => {
  const data: Forum = await request.json();

  const { params } = forumCommentReplyReadSchema.parse(context);
  const { content } = forumCommentReplyUpdateSchema.parse(data);

  return await prisma.forumCommentReply.update({
    where: {
      id: Number(params.id),
    },
    data: {
      content,
    },
  });
};
