import { Navbar } from "@/components/admin/Navbar";
import { Sidebar } from "@/components/admin/Sidebar";
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
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <AuthProvider>
          {/* @ts-expect-error Async Server Component */}
          <Navbar />
          <div className="flex flex-1">
            <aside className="lg:w-1/5">
              <Sidebar />
            </aside>
            <main className="w-full lg:w-4/5">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}