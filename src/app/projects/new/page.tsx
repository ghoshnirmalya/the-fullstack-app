import { ProjectForm } from "@/app/components/ProjectForm";

export default async function IndexPage() {
  return (
    <div className="p-4 space-y-4 container mx-auto">
      <ProjectForm />
    </div>
  );
}
