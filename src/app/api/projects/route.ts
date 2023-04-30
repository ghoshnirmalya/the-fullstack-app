import { prisma } from "@/app/utils/prisma";

import { NextResponse } from "next/server";

export async function GET() {
  const projects = await prisma.project.findMany({
    where: {
      creatorId: 1,
    },
  });

  return NextResponse.json({
    projects,
  });
}

export async function POST(request: Request) {
  const { title } = await request.json();

  const project = await prisma.project.create({
    data: {
      title,
      creatorId: 1,
    },
  });

  return NextResponse.json({
    project,
  });
}
