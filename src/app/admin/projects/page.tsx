import { ProjectCard } from "@/components/ProjectCard";
import { buttonVariants } from "@/components/ui/button";
import { getApiUrl } from "@/lib/get-api-url";
import { Project } from "@prisma/client";
import { headers } from "next/headers";
import Link from "next/link";

export default async function ProjectIndexPage() {
  const response = await fetch(getApiUrl("api/projects"), {
    method: "GET",
    cache: "no-store",
    headers: headers() as HeadersInit,
  });
  const projects: Project[] = await response.json();

  return (
    <div className="p-4 space-y-4 container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link href="/projects/new" className={buttonVariants({})}>
          Add project
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => {
          return <ProjectCard key={project.id} project={project} />;
        })}
      </div>
    </div>
  );
}