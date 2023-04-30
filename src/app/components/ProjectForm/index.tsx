"use client";

import { useRouter } from "next/navigation";

export const ProjectForm = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;

    const response = await fetch("http://localhost:3000/api/projects", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    const { project } = await response.json();

    router.push(`/projects/${project.id}`);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="border rounded px-4 py-2"
        />
      </div>
    </form>
  );
};
