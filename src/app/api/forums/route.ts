import { create } from "@/controllers/forums/create";
import { list } from "@/controllers/forums/list";
import { forumReadSchema } from "@/controllers/forums/show";
import { authOptions } from "@/lib/auth";
import { Forum } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    const forums = await list();

    return new NextResponse(JSON.stringify(forums));
  } catch (error) {
    console.log("Error", error);

    return new NextResponse(null, {
      status: 500,
    });
  }
}

export async function POST(
  request: Request,
  context: z.infer<typeof forumReadSchema>,
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(null, {
        status: 401,
      });
    }

    const forum: Forum = await create(request, context, session);

    return new NextResponse(JSON.stringify(forum), {
      status: 201,
    });
  } catch (error) {
    console.log(error);

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
