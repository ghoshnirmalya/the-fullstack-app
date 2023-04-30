import { Project } from "@prisma/client";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link href="/" className="p-4 border rounded space-y-2">
      <h2 className="font-bold">{project.title}</h2>
      <p className="text-sm">{project.description}</p>
    </Link>
  );
};
