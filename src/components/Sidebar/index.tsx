import { ProjectsSelectorDropdown } from "@/components/ProjectsSelectorDropdown";
import { SidebarLinks } from "@/components/Sidebar/SidebarLinks";
import { getApiUrl } from "@/lib/get-api-url";
import { Project } from "@prisma/client";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export const Sidebar = async () => {
  const response = await fetch(getApiUrl("api/projects"), {
    headers: headers() as HeadersInit,
  });

  if (!response.ok) {
    return notFound();
  }

  const projects: Project[] = await response.json();

  return (
    <div className="flex flex-col space-y-2 border-r p-4 h-full w-full text-sm">
      <div className="hidden lg:block">
        <ProjectsSelectorDropdown projects={projects} />
      </div>
      <SidebarLinks />
    </div>
  );
};
