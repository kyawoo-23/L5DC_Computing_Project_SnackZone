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
  Badge,
  Input,
} from "@nextui-org/react";
import SnackZone from "@/assets/Snack Zone Logo.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import toast from "react-hot-toast";
import ConfirmBox from "@/components/Dialog/ConfirmBox";
import { FaHeart } from "react-icons/fa6";
import { IoCart, IoSearch } from "react-icons/io5";

const NavBar = ({ count }: { count: number }) => {
  const router = useRouter();
  const token = getCookie("cus-token");
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
    deleteCookie("cus-token");
    deleteCookie("cus-name");
    toast.success("Logout successful");
    setIsDialogOpen(false);
    router.push("/login");
  };

  let debounceTimer: ReturnType<typeof setTimeout>;
  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(debounceTimer);
    const searchTerm = e.target.value.trim();
    debounceTimer = setTimeout(() => {
      searchTerm ? router.push(`/search/${searchTerm}`) : router.push("/");
    }, 800);
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
          <NavbarItem>
            <div>
              <Input
                size='sm'
                classNames={{ inputWrapper: ["h-[12px]"] }}
                placeholder='Search'
                startContent={<IoSearch />}
                onChange={(e) => handleSearchQuery(e)}
              />
            </div>
          </NavbarItem>
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
                    size='sm'
                  >
                    Sign Up
                  </Button>
                </NavbarItem>
              </>
            ) : (
              <div className='flex items-center gap-4'>
                <NavbarItem>
                  <Link href='/profile'>{name}</Link>
                </NavbarItem>
                <NavbarItem as={Link} href='/wishlist'>
                  <span>
                    <FaHeart className='text-[23px] text-white' />
                  </span>
                </NavbarItem>
                <NavbarItem as={Link} href='/cart'>
                  <Badge
                    content={count}
                    color='warning'
                    variant='faded'
                    isInvisible={count === 0}
                  >
                    <span>
                      <IoCart className='text-[26px] text-white' />
                    </span>
                  </Badge>
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
              </div>
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
