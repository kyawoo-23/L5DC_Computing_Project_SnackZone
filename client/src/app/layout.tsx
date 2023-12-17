import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import NavBar from "@/components/NavBar/NavBar";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='dark'>
      <body className={poppins.className} suppressHydrationWarning={true}>
        <NavBar />
        <div className='max-w-5xl p-6 mx-auto'>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
