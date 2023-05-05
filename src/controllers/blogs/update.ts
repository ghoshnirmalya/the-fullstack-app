import { blogReadSchema } from "@/controllers/blogs/show";
import { prisma } from "@/lib/prisma";
import { Blog } from "@prisma/client";
import { z } from "zod";

export const blogUpdateSchema = z.object({
  title: z.string().min(5),
  content: z.string(),
});

export const update = async (
  request: Request,
  context: z.infer<typeof blogReadSchema>
) => {
  const data: Blog = await request.json();

  const { params } = blogReadSchema.parse(context);
  const { title, content } = blogUpdateSchema.parse(data);

  return await prisma.blog.update({
    where: {
      id: Number(params.id),
    },
    data: {
      title,
      content,
    },
  });
};
