import { forumReadSchema } from "@/controllers/forums/show";
import { prisma } from "@/lib/prisma";
import { Forum } from "@prisma/client";
import type { Session } from "next-auth";
import { z } from "zod";

export const forumCommentCreateSchema = z.object({
  title: z.string().min(5),
  description: z.string().optional(),
});

export const create = async (
  request: Request,
  _context: z.infer<typeof forumReadSchema>,
  session: Session
) => {
  const data: Forum = await request.json();

  const { title, description } = forumCommentCreateSchema.parse(data);

  return await prisma.forum.create({
    data: {
      title,
      description,
      creatorId: session.user.id,
    },
  });
};
