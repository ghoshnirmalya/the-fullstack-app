import { destroy } from "@/controllers/blogs/destroy";
import { blogReadSchema, show } from "@/controllers/blogs/show";
import { update } from "@/controllers/blogs/update";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  request: Request,
  context: z.infer<typeof blogReadSchema>
) {
  try {
    const blog = await show(request, context);

    return new NextResponse(JSON.stringify(blog), {
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
  context: z.infer<typeof blogReadSchema>
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(null, {
        status: 401,
      });
    }

    const blog = await update(request, context);

    return new NextResponse(JSON.stringify(blog), {
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
  context: z.infer<typeof blogReadSchema>
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
