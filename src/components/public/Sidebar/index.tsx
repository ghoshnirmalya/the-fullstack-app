import { SidebarLinks } from "@/components/public/Sidebar/SidebarLinks";

export const Sidebar = () => {
  return (
    <div className="flex flex-col space-y-2 border-r p-4 h-full w-full text-sm bg-white">
      <SidebarLinks />
    </div>
  );
};
