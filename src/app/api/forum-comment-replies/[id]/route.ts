import { destroy } from "@/controllers/forum-comment-replies/destroy";
import {
  forumCommentReplyReadSchema,
  show,
} from "@/controllers/forum-comment-replies/show";
import { update } from "@/controllers/forum-comment-replies/update";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  request: Request,
  context: z.infer<typeof forumCommentReplyReadSchema>
) {
  try {
    const forumCommentReply = await show(request, context);

    return new NextResponse(JSON.stringify(forumCommentReply), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(null, {
      status: 500,
    });
  }
}

export async function PATCH(
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

    const forumCommentReply = await update(request, context);

    return new NextResponse(JSON.stringify(forumCommentReply), {
      status: 200,
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

export async function DELETE(
  request: Request,
  context: z.infer<typeof forumCommentReplyReadSchema>
) {
  try {
    await destroy(request, context);

    return new NextResponse(null, {
      status: 202,
    });
  } catch (error) {
    return new NextResponse(null, {
      status: 500,
    });
  }
}
