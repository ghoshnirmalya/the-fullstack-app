"use server";

import { prisma } from "@/lib/prisma";
import { Forum } from "@prisma/client";
import { Session } from "next-auth";

export const create = async ({
  title,
  content,
  session,
}: {
  title: Forum["title"];
  content: Forum["content"];
  session: Session;
}) => {
  const forum = await prisma.forum.create({
    data: {
      title,
      content,
      creatorId: session.user.id,
    },
  });

  return forum;
};

export const update = async ({
  id,
  title,
  content,
}: {
  id: Forum["id"];
  title: Forum["title"];
  content: Forum["content"];
  session: Session;
}) => {
  const forum = await prisma.forum.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });

  return forum;
};

export const destroy = async ({ id }: { id: Forum["id"] }) => {
  await prisma.forum.delete({
    where: {
      id,
    },
  });
};

export const list = async () => {
  const forums = prisma.forum.findMany();

  return forums;
};
