import { SignOutButton } from "@/components/public/Navbar/SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";

interface UserDetailsProps {
  session: Session;
}

export const UserDetails = ({ session }: UserDetailsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Avatar className="w-8 h-8 border">
            {session?.user?.image && (
              <AvatarImage src={session?.user?.image} width={32} height={32} />
            )}
            <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-t-none border-t-0"
        align="end"
        sideOffset={13}
      >
        <DropdownMenuGroup>
          <Link href="/admin/dashboard" className="flex items-center w-full">
            <DropdownMenuItem className="w-full hover:cursor-pointer">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
