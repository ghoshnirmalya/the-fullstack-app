import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    forums: {
      create: [
        {
          title: "Join the Prisma Slack",
          content: "https://slack.prisma.io",
          published: true,
        },
        {
          title: "Follow Prisma on Twitter",
          content: "https://twitter.com/prisma",
          published: false,
        },
      ],
    },
    blogs: {
      create: [
        {
          title: "Prisma Day 2021",
          content: "https://prisma.io/day",
          published: true,
        },
        {
          title: "Prisma Day 2022",
          content: "https://prisma.io/day",
          published: false,
        },
      ],
    },
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    forums: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          content: "https://twitter.com/prisma",
          published: false,
        },
      ],
    },
    blogs: {
      create: [
        {
          title: "Prisma Day 2022",
          content: "https://prisma.io/day",
          published: false,
        },
        {
          title: "Prisma Day 2023",
          content: "https://prisma.io/day",
          published: true,
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });

    console.log(`Created user with id: ${user.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
