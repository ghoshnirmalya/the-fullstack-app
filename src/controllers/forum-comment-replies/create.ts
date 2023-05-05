import { forumCommentReplyReadSchema } from "@/controllers/forum-comment-replies/show";
import { prisma } from "@/lib/prisma";
import { ForumComment } from "@prisma/client";
import type { Session } from "next-auth";
import { z } from "zod";

export const forumCommentReplyCreateSchema = z.object({
  content: z.string().min(5),
  forumCommentId: z.number(),
});

export const create = async (
  request: Request,
  _context: z.infer<typeof forumCommentReplyReadSchema>,
  session: Session
) => {
  const data: ForumComment = await request.json();

  const { content, forumCommentId } = forumCommentReplyCreateSchema.parse(data);

  return await prisma.forumCommentReply.create({
    data: {
      content,
      forumCommentId,
      authorId: session.user.id,
    },
  });
};
