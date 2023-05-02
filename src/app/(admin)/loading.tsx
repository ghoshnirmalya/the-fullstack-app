import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-4 w-full flex gap-4">
      <Skeleton className="h-24 w-1/2" />
      <Skeleton className="h-24 w-1/2" />
    </div>
  );
}
