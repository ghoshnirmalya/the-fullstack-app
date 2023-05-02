import { Sidebar } from "@/components/Sidebar";
import { AuthProvider } from "@/services/auth-provider";
import "@/styles/tailwind.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <aside className="lg:w-1/5">
        <Sidebar />
      </aside>
      <main className="w-full lg:w-4/5">
        <AuthProvider>{children}</AuthProvider>
      </main>
    </div>
  );
}