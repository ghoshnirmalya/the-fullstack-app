import { Navbar } from "@/components/public/Navbar";
import { Sidebar } from "@/components/public/Sidebar";
import { AuthProvider } from "@/services/auth-provider";
import "@/styles/tailwind.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Forums | the-fullstack-app",
  description:
    "This is a demo of a fullstack app using Next.js, Prisma, and NextAuth by Nirmalya Ghosh.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen flex flex-col bg-gray-50`}>
        <AuthProvider>
          {/* @ts-expect-error Async Server Component */}
          <Navbar />
          <div className="flex flex-1 relative">
            <aside className="w-auto lg:w-[250px] h-full fixed top-[65px]">
              <Sidebar />
            </aside>
            <main className="w-[calc(100vw-73px)] lg:w-[calc(100vw-250px)] overflow-y-scroll relative left-[73px] lg:left-[250px] top-[65px] h-[calc(100vh-73px)]">
              <div className="h-full">{children}</div>
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
