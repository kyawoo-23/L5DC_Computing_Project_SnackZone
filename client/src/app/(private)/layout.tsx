import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getCookie("token", { cookies });

  if (!token) {
    redirect("/login");
  }

  return <section>{children}</section>;
}
