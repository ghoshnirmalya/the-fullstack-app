import { Sidebar } from "@/components/admin/Sidebar";
import { AuthProvider } from "@/services/auth-provider";
import "@/styles/tailwind.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin | the-fullstack-app",
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
      <body className={`${inter.className} h-screen flex bg-gray-100`}>
        <AuthProvider>
          <aside className="w-auto lg:w-[250px] h-full fixed">
            {/* @ts-expect-error Async Server Component */}
            <Sidebar />
          </aside>
          <main className="w-[calc(100vw-73px)] lg:w-[calc(100vw-250px)] overflow-y-scroll relative left-[73px] lg:left-[250px] bg-white">
            <div className="h-full">{children}</div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
