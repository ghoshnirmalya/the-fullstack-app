import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { z } from "zod";

const forumReadSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

const forumUpdateSchema = z.object({
  title: z.string().min(5),
  description: z.string().optional(),
});

export async function GET(
  request: Request,
  context: z.infer<typeof forumReadSchema>
) {
  try {
    const { params } = forumReadSchema.parse(context);

    const forum = await prisma.forum.findUnique({
      where: {
        id: Number(params.id),
      },
      include: {
        comments: {
          include: {
            author: {
              select: {
                name: true,
                image: true,
                id: true,
              },
            },
          },
        },
      },
    });

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

    const { params } = forumReadSchema.parse(context);
    const json = await request.json();
    const { title, description } = forumUpdateSchema.parse(json);

    const forum = await prisma.forum.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title,
        description,
      },
    });

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
    const { params } = forumReadSchema.parse(context);

    await prisma.forum.delete({
      where: {
        id: Number(params.id),
      },
    });

    return new NextResponse(null, {
      status: 202,
    });
  } catch (error) {
    return new NextResponse(null, {
      status: 500,
    });
  }
}
