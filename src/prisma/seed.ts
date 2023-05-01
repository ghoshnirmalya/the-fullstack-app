import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    projects: {
      create: [
        {
          title: "Join the Prisma Slack",
          description: "https://slack.prisma.io",
          published: true,
        },
        {
          title: "Follow Prisma on Twitter",
          description: "https://twitter.com/prisma",
          published: false,
        },
      ],
    },
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    projects: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          description: "https://twitter.com/prisma",
          published: false,
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
