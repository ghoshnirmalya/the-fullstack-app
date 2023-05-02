import { ProjectCreateForm } from "@/components/ProjectCreateForm";

export default async function ProjectCreatePage() {
  return (
    <div className="p-4 space-y-4 container mx-auto">
      <div className="w-full md:w-1/2">
        <ProjectCreateForm />
      </div>
    </div>
  );
}
