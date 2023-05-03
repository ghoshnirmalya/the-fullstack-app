import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

import { z } from "zod";

const forumCreateSchema = z.object({
  title: z.string().min(5),
  description: z.string().optional(),
});

export async function GET() {
  try {
    const forums = await prisma.forum.findMany();

    return new NextResponse(JSON.stringify(forums));
  } catch (error) {
    return new NextResponse(null, {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(null, {
        status: 401,
      });
    }

    const json = await request.json();
    const { title, description } = forumCreateSchema.parse(json);

    const forum = await prisma.forum.create({
      data: {
        title,
        description,
        creatorId: session.user.id,
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
