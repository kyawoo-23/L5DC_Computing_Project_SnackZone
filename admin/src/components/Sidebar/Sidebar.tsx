"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronFirst, LogOut } from "lucide-react";
import SnackZoneLogo from "@/assets/SnackZone.png";
import { Menus } from "@/constants/MenuList";
import LayoutTemplate from "@/components/LayoutTemplate/LayoutTemplate";
import { deleteCookie, getCookie } from "cookies-next";
import { ConfirmDialog } from "../Dialog/ConfirmDialog";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

function getLocalIsSidebarOpen() {
  return localStorage.getItem("isSidebarOpen") === "true" ? true : false;
}

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [mount, setMount] = useState(false);
  const pathName = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);
  const [open, setOpen] = useState(
    typeof window !== "undefined" ? getLocalIsSidebarOpen : null
  );
  const router = useRouter();

  const token = getCookie("token");
  useEffect(() => {
    setMount(true);
    if (pathName !== "/login") {
      !token && router.push("/login");
    } else {
      token && router.push("/");
    }
  }, [pathName, router, token]);

  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("name");
    deleteCookie("role");
    toast.success("Logout successful");
    router.push("/login");
  };

  console.log("TOKEN", token);
  return (
    <>
      {mount && (
        <div className='flex'>
          {token && (
            <div
              className={`${
                open ? "w-72" : "w-20"
              } bg-accent h-screen p-5 pt-7 duration-300 fixed`}
            >
              <div
                className={`absolute cursor-pointer -right-3 top-9 w-6 h-6 grid place-items-center ring-2 ring-white bg-accent rounded-full  ${
                  !open && "rotate-180"
                }`}
                onClick={() => {
                  localStorage.setItem("isSidebarOpen", `${!open}`);
                  setOpen(getLocalIsSidebarOpen);
                }}
              >
                <ChevronFirst size={18} color='white' />
              </div>
              <div className='flex gap-x-4 items-center'>
                <Image
                  src={SnackZoneLogo}
                  className={`rounded-full ${!open && ""}`}
                  width={40}
                  height={40}
                  alt='Snack Zone logo'
                />
                <h1
                  className={`text-white origin-left font-medium text-md duration-200 whitespace-nowrap ${
                    !open && "hidden"
                  }`}
                >
                  Snack Zone dashboard
                </h1>
              </div>
              <ul className='pt-6'>
                {Menus.map((Menu, index) => {
                  if (
                    Menu.adminAccess &&
                    getCookie("role")?.toLocaleLowerCase() !== "admin"
                  ) {
                    return null;
                  }
                  return (
                    <Link href={Menu.path} key={index}>
                      <li
                        className={`group flex rounded-md p-2 cursor-pointer text-gray-300 text-sm items-center gap-x-4 font-medium ${
                          pathName === Menu.path
                            ? "bg-gray-100 text-black"
                            : "hover:bg-zinc-400"
                        }
              ${Menu.gap ? "mt-9" : "mt-2"}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <span>
                          <Menu.src
                            size={22}
                            color={
                              pathName === Menu.path
                                ? "black"
                                : hoveredIndex === index
                                ? "black"
                                : "white"
                            }
                          />
                        </span>
                        <span
                          className={`${
                            !open && "hidden"
                          } group-hover:text-black whitespace-nowrap ${
                            pathName === Menu.path
                              ? "text-black"
                              : "text-zinc-300"
                          }`}
                        >
                          {Menu.title}
                        </span>
                      </li>
                    </Link>
                  );
                })}
                <hr className='mt-9 mb-6' />
                <li
                  className={`flex rounded-md p-2 cursor-pointer text-gray-300 text-sm items-center gap-x-4 font-medium`}
                >
                  <ConfirmDialog
                    confirmText='Confirm'
                    description='Are you sure to logout of the system?'
                    onConfirm={() => handleLogout()}
                    title='Logout confirmation'
                  >
                    <Button
                      variant={"ghost"}
                      className='flex gap-x-4 items-center p-0 w-full justify-start'
                    >
                      <span>
                        <LogOut size={22} />
                      </span>
                      <span
                        className={`${
                          !open && "hidden"
                        } duration-200 whitespace-nowrap`}
                      >
                        {getCookie("name")}
                      </span>
                    </Button>
                  </ConfirmDialog>
                </li>
              </ul>
            </div>
          )}
          <main
            className={`flex-1 p-5 pt-3 duration-300 ${
              token ? (open ? "ml-72" : "ml-20") : "ml-0"
            }`}
          >
            <LayoutTemplate>{children}</LayoutTemplate>
          </main>
        </div>
      )}
    </>
  );
}
