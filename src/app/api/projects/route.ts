import { prisma } from "@/lib/prisma";

import { z } from "zod";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        creatorId: 1,
      },
    });

    return new Response(JSON.stringify(projects));
  } catch (error) {
    return new Response(null, {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();

    const project = await prisma.project.create({
      data: {
        title,
        description,
        creatorId: 1,
      },
    });

    return new Response(JSON.stringify(project), {
      status: 201,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), {
        status: 422,
      });
    }

    return new Response(null, {
      status: 500,
    });
  }
}
