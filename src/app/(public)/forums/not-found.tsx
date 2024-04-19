import { Ban } from "lucide-react";

export default function NotFound() {
  return (
    <div className="p-4 space-y-4 container max-w-6xl mx-auto h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Forums</h1>
      </div>
      <div className="p-4 h-full flex items-center justify-center flex-col space-y-4">
        <Ban className="w-12 h-12 text-gray-600" />
        <h2>No forums exist yet!</h2>
      </div>
    </div>
  );
}
