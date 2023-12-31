import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snack Zone Admin dashboard",
  description: "Developed by Kko",
  icons: {
    icon: "/favico.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <Toaster position='top-right' reverseOrder={false} />
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
