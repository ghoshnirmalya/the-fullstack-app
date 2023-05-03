import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const projectReadSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

const projectUpdateSchema = z.object({
  title: z.string().min(5),
  description: z.string().optional(),
});

export async function GET(
  request: Request,
  context: z.infer<typeof projectReadSchema>
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(null, {
        status: 401,
      });
    }

    const { params } = projectReadSchema.parse(context);

    const project = await prisma.project.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    return new NextResponse(JSON.stringify(project), {
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
  context: z.infer<typeof projectReadSchema>
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(null, {
        status: 401,
      });
    }

    const { params } = projectReadSchema.parse(context);
    const json = await request.json();
    const { title, description } = projectUpdateSchema.parse(json);

    const project = await prisma.project.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title,
        description,
      },
    });

    return new NextResponse(JSON.stringify(project), {
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
  context: z.infer<typeof projectReadSchema>
) {
  try {
    const { params } = projectReadSchema.parse(context);

    await prisma.project.delete({
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
