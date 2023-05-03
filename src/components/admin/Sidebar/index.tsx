import { SidebarLinks } from "@/components/admin/Sidebar/SidebarLinks";

export const Sidebar = () => {
  return (
    <div className="flex flex-col space-y-2 p-4 h-full w-full text-sm bg-gray-50 text-muted-foreground">
      <SidebarLinks />
    </div>
  );
};
