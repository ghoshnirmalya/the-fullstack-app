import { ForumCreateForm } from "@/components/admin/ForumCreateForm";

export default async function ForumCreatePage() {
  return (
    <div className="p-4 space-y-4 container mx-auto">
      <div className="w-full md:w-1/2">
        <ForumCreateForm />
      </div>
    </div>
  );
}
