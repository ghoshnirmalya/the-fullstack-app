import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Ban } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-4 h-full flex items-center justify-center flex-col space-y-4">
      <Ban className="w-12 h-12 text-gray-600" />
      <h2>The project does not exist!</h2>
      <Link href="/projects" className={buttonVariants({ variant: "outline" })}>
        View all projects <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
}
