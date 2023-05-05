import { destroy } from "@/controllers/forums/destroy";
import { forumReadSchema, show } from "@/controllers/forums/show";
import { update } from "@/controllers/forums/update";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  request: Request,
  context: z.infer<typeof forumReadSchema>
) {
  try {
    const forum = await show(request, context);

    return new NextResponse(JSON.stringify(forum), {
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
  context: z.infer<typeof forumReadSchema>
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(null, {
        status: 401,
      });
    }

    const forum = await update(request, context);

    return new NextResponse(JSON.stringify(forum), {
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
  context: z.infer<typeof forumReadSchema>
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
