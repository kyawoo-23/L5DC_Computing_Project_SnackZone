import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import NavBar from "@/components/NavBar/NavBar";
import { Toaster } from "react-hot-toast";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Snack Zone",
  description: "Developed by Kko",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let count = 0;
  const token = getCookie("cus-token", { cookies }) as string;
  if (token) {
    count = await prisma?.cartProduct.count({
      where: {
        CustomerId: token,
      },
    });
  }

  return (
    <html lang='en' className='dark'>
      <body className={poppins.className} suppressHydrationWarning={true}>
        <Toaster position='top-right' reverseOrder={false} />
        <NavBar count={count} />
        <div className='max-w-5xl p-6 mx-auto'>
          <Providers>{children}</Providers>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
