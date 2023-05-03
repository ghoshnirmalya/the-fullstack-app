import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-4 space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="w-full flex gap-4">
        <Skeleton className="h-24 w-1/3" />
        <Skeleton className="h-24 w-1/3" />
        <Skeleton className="h-24 w-1/3" />
      </div>
    </div>
  );
}
