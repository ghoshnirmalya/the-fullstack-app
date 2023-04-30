import { prisma } from "@/app/utils/prisma";
import { ProjectCard } from "./components/ProjectCard";

export default async function IndexPage() {
  const projects = await prisma.project.findMany();

  return (
    <div className="p-4 space-y-4 container mx-auto">
      <h1 className="text-2xl font-bold">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {projects.map((project) => {
          return <ProjectCard key={project.id} project={project} />;
        })}
      </div>
    </div>
  );
}
