import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

import { z } from "zod";

const projectCreateSchema = z.object({
  title: z.string().min(5),
  description: z.string().optional(),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", {
        status: 403,
      });
    }

    const projects = await prisma.project.findMany({
      where: {
        creatorId: session.user.id,
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
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", {
        status: 403,
      });
    }

    const json = await request.json();
    const { title, description } = projectCreateSchema.parse(json);

    const project = await prisma.project.create({
      data: {
        title,
        description,
        creatorId: session.user.id,
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
