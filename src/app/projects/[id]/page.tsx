import { ProjectEditForm } from "@/components/ProjectEditForm";
import { getApiUrl } from "@/lib/get-api-url";
import { Project } from "@prisma/client";

interface IndexPageProps {
  params: {
    id: string;
  };
}

export default async function IndexPage({ params: { id } }: IndexPageProps) {
  const response = await fetch(getApiUrl(`api/projects/${id}`), {
    method: "GET",
    cache: "no-store",
  });
  const project: Project = await response.json();

  if (!project) {
    return <div className="p-4">Project not found</div>;
  }

  return (
    <div className="p-4 space-y-4 container mx-auto">
      <div className="w-full md:w-1/2">
        <ProjectEditForm project={project} />
      </div>
    </div>
  );
}
