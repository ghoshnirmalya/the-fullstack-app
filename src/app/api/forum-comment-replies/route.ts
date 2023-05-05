import { create } from "@/controllers/forum-comment-replies/create";
import { list } from "@/controllers/forum-comment-replies/list";
import { forumCommentReplyReadSchema } from "@/controllers/forum-comment-replies/show";
import { authOptions } from "@/lib/auth";
import { ForumComment, ForumCommentReply } from "@prisma/client";
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
  context: z.infer<typeof forumCommentReplyReadSchema>
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(null, {
        status: 401,
      });
    }

    const forumCommentreply: ForumCommentReply = await create(
      request,
      context,
      session
    );

    return new NextResponse(JSON.stringify(forumCommentreply), {
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
