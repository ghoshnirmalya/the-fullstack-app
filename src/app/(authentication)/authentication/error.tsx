"use client";

import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-4 h-full flex items-center justify-center flex-col space-y-4">
      <Ban className="w-12 h-12 text-gray-600" />
      <h2>Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
