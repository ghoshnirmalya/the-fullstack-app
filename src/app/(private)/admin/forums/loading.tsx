import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center w-full">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-32" />
      </div>
      <div className="w-full flex gap-4">
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  );
}
