import { ProjectCard } from "@/app/components/ProjectCard";
import { prisma } from "@/app/utils/prisma";
import Link from "next/link";

export default async function IndexPage() {
  const projects = await prisma.project.findMany({
    where: {
      creatorId: 1,
    },
  });

  return (
    <div className="p-4 space-y-4 container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link
          href="/projects/new"
          className="border bg-gray-50 px-4 py-2 rounded"
        >
          Add project
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {projects.map((project) => {
          return <ProjectCard key={project.id} project={project} />;
        })}
      </div>
    </div>
  );
}
