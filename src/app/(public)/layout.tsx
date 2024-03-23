import { Navbar } from "@/components/public/Navbar";
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
      <body className={`${inter.className} h-screen flex flex-col bg-white`}>
        <AuthProvider>
          <Navbar />
          <main className="overflow-y-scroll relative w-full top-[65px] h-[calc(100vh-73px)]">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
