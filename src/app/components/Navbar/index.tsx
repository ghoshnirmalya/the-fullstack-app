import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="border-b text-sm">
      <div className="px-4 h-16 container mx-auto flex items-center justify-between">
        <div className="space-x-4">
          <Link href="/" className="font-bold mr-8">
            Logo
          </Link>
          <Link href="/">Dashboard</Link>
          <Link href="/">Projects</Link>
        </div>
        <div className="space-x-4">
          <button>John Doe</button>
        </div>
      </div>
    </div>
  );
};
