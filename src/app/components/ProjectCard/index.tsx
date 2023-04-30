import Link from "next/link";

export const ProjectCard = () => {
  return (
    <Link href="/" className="p-4 border rounded space-y-2">
      <h2 className="font-bold">Project 1</h2>
      <p className="text-sm">Project 1 description</p>
    </Link>
  );
};
