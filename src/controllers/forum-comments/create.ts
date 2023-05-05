import { forumCommentReadSchema } from "@/controllers/forum-comments/show";
import { prisma } from "@/lib/prisma";
import { ForumComment } from "@prisma/client";
import type { Session } from "next-auth";
import { z } from "zod";

export const forumCommentCreateSchema = z.object({
  content: z.string().min(5),
  forumId: z.number(),
});

export const create = async (
  request: Request,
  _context: z.infer<typeof forumCommentReadSchema>,
  session: Session
) => {
  const data: ForumComment = await request.json();

  const { content, forumId } = forumCommentCreateSchema.parse(data);

  return await prisma.forumComment.create({
    data: {
      content,
      forumId,
      authorId: session.user.id,
    },
  });
};
