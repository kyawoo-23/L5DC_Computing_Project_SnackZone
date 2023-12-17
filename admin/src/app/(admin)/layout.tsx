import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getCookie("token", { cookies });
  const role = getCookie("role", { cookies });
  console.log("ROLE", role);
  if (token && role !== "Admin") {
    redirect("/");
  }

  return <section>{children}</section>;
}
