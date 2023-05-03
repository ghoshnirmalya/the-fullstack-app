import { ForumCreateForm } from "@/components/admin/ForumCreateForm";

export default async function ForumCreatePage() {
  return (
    <div className="p-4 gap-4">
      <div className="w-full xl:w-1/2 mx-auto">
        <ForumCreateForm />
      </div>
    </div>
  );
}
