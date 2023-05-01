import { prisma } from "@/lib/prisma";
import { z } from "zod";

const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export async function GET(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    const project = await prisma.project.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    return new Response(JSON.stringify(project), {
      status: 200,
    });
  } catch (error) {
    return new Response(null, {
      status: 500,
    });
  }
}

export async function PATCH(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const { title, description } = await request.json();

    const project = await prisma.project.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title,
        description,
      },
    });

    return new Response(JSON.stringify(project), {
      status: 200,
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

export async function DELETE(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    await prisma.project.delete({
      where: {
        id: Number(params.id),
      },
    });

    return new Response(null, {
      status: 202,
    });
  } catch (error) {
    return new Response(null, {
      status: 500,
    });
  }
}
