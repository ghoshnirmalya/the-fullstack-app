import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

import { z } from "zod";

const forumCommentCreateSchema = z.object({
  content: z.string().min(5),
  forumId: z.number(),
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(null, {
        status: 401,
      });
    }

    const json = await request.json();
    const { content, forumId } = forumCommentCreateSchema.parse(json);

    const forum = await prisma.forumComment.create({
      data: {
        content,
        forumId,
        authorId: session.user.id,
      },
    });

    return new NextResponse(JSON.stringify(forum), {
      status: 201,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), {
        status: 422,
      });
    }

    return new NextResponse(null, {
      status: 500,
    });
  }
}
