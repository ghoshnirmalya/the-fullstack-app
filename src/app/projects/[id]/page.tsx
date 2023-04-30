import { prisma } from "@/app/utils/prisma";

interface IndexPageProps {
  params: {
    id: string;
  };
}

export default async function IndexPage({ params: { id } }: IndexPageProps) {
  const project = await prisma.project.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="p-4 space-y-4 container mx-auto">
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <p className="text-sm">{project?.description}</p>
    </div>
  );
}
