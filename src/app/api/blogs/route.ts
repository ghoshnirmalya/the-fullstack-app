import { create } from "@/controllers/blogs/create";
import { list } from "@/controllers/blogs/list";
import { blogReadSchema } from "@/controllers/blogs/show";
import { authOptions } from "@/lib/auth";
import { Blog } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    const blogs = await list();

    return new NextResponse(JSON.stringify(blogs));
  } catch (error) {
    return new NextResponse(null, {
      status: 500,
    });
  }
}

export async function POST(
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

    const blog: Blog = await create(request, context, session);

    return new NextResponse(JSON.stringify(blog), {
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
