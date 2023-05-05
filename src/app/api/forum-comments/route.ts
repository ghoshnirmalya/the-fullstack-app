import { create } from "@/controllers/forum-comments/create";
import { list } from "@/controllers/forum-comments/list";
import { forumCommentReadSchema } from "@/controllers/forum-comments/show";
import { authOptions } from "@/lib/auth";
import { ForumComment } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    const forumCommentReplies = await list();

    return new NextResponse(JSON.stringify(forumCommentReplies));
  } catch (error) {
    return new NextResponse(null, {
      status: 500,
    });
  }
}

export async function POST(
  request: Request,
  context: z.infer<typeof forumCommentReadSchema>
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(null, {
        status: 401,
      });
    }

    const forumComment: ForumComment = await create(request, context, session);

    return new NextResponse(JSON.stringify(forumComment), {
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
