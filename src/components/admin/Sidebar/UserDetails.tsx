import { SignOutButton } from "@/components/admin/Sidebar/SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PanelBottomOpen } from "lucide-react";
import { Session } from "next-auth";

interface UserDetailsProps {
  session: Session;
}

export const UserDetails = ({ session }: UserDetailsProps) => {
  return (
    <div className="space-x-2 w-full rounded-none border-t">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="space-x-2 w-full p-2 rounded-none justify-center lg:justify-start items-center"
          >
            <Avatar className="block lg:hidden w-8 h-8 border">
              {session?.user?.image && (
                <AvatarImage
                  src={session?.user?.image}
                  width={32}
                  height={32}
                />
              )}
              <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="hidden lg:flex justify-between w-full  items-center">
              <span>{session?.user?.name}</span>
              <PanelBottomOpen className="w-4 h-4" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[60px] lg:w-[240px] px-[5px] min-w-full"
          sideOffset={15}
        >
          <SignOutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
