"use client";

import { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@nextui-org/react";
import SnackZone from "@/assets/Snack Zone Logo.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import toast from "react-hot-toast";
import ConfirmBox from "@/components/Dialog/ConfirmBox";

const NavBar = () => {
  const router = useRouter();
  const token = getCookie("token");
  const name = getCookie("name");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mount, setMount] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();
  const menuItems = [
    {
      name: "Category",
      link: "/category",
    },
    {
      name: "Supplier",
      link: "/supplier",
    },
    {
      name: "Promotion",
      link: "/promotion",
    },
  ];

  useEffect(() => {
    setMount(true);
  }, []);

  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("name");
    toast.success("Logout successful");
    router.push("/login");
  };

  return (
    <>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        shouldHideOnScroll
        isBordered
        isBlurred
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className='sm:hidden'
          />
          <NavbarBrand>
            <Link href='/'>
              <Image
                src={SnackZone}
                alt='Snack Zone logo'
                width={50}
                height={50}
                className='rounded w-auto h-auto'
                priority
                quality={100}
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className='hidden sm:flex gap-4' justify='center'>
          {menuItems.map((item, index) => (
            <NavbarItem
              key={index}
              {...(pathName === item.link ? { isActive: true } : {})}
            >
              <Link
                color={pathName === item.link ? "primary" : "foreground"}
                href={`${item.link}`}
              >
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        {mount && (
          <NavbarContent justify='end'>
            {!token ? (
              <>
                <NavbarItem>
                  <Link href='/login'>Login</Link>
                </NavbarItem>
                <NavbarItem>
                  <Button
                    as={Link}
                    color='primary'
                    href='/signup'
                    variant='flat'
                  >
                    Sign Up
                  </Button>
                </NavbarItem>
              </>
            ) : (
              <>
                <NavbarItem>
                  <Link href='/profile'>{name}</Link>
                </NavbarItem>
                <NavbarItem>
                  <Button
                    size='sm'
                    variant='ghost'
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Logout
                  </Button>
                </NavbarItem>
              </>
            )}
          </NavbarContent>
        )}
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className='w-full'
                href={`${item.link}`}
                size='lg'
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <ConfirmBox
        buttonLabel='Confirm'
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title='Are you sure you want to logout?'
        onAction={handleLogout}
      >
        <p className='text-sm'>
          You will be redirected to the login page after logging out.
        </p>
      </ConfirmBox>
    </>
  );
};

export default NavBar;
