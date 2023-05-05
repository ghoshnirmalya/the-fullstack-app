import { blogReadSchema } from "@/controllers/blogs/show";
import { prisma } from "@/lib/prisma";
import { Blog } from "@prisma/client";
import type { Session } from "next-auth";
import { z } from "zod";

export const blogCommentCreateSchema = z.object({
  title: z.string().min(5),
  content: z.string(),
});

export const create = async (
  request: Request,
  _context: z.infer<typeof blogReadSchema>,
  session: Session
) => {
  const data: Blog = await request.json();

  const { title, content } = blogCommentCreateSchema.parse(data);

  return await prisma.blog.create({
    data: {
      title,
      content,
      creatorId: session.user.id,
    },
  });
};
