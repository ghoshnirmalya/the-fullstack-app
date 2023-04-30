import { ProjectCard } from "./components/ProjectCard";

export default function IndexPage() {
  return (
    <div className="p-4 space-y-4 container mx-auto">
      <h1 className="text-2xl font-bold">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
}
