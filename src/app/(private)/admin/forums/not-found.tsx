import { buttonVariants } from "@/components/ui/button";
import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-4 space-y-4 container mx-auto h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Forums</h1>
        <Link href="/forums/new" className={buttonVariants({})}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add forum
        </Link>
      </div>
      <div className="p-4 h-full flex items-center justify-center flex-col space-y-4">
        <Ban className="w-12 h-12 text-gray-600" />
        <h2>No forums exist yet!</h2>
      </div>
    </div>
  );
}
