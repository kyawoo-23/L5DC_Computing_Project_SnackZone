import {
  BarChart3,
  ClipboardList,
  ShoppingCart,
  Boxes,
  Users,
  Truck,
  UserCog,
  LayoutList,
  Network,
} from "lucide-react";

export const Menus = [
  { title: "Dashboard", path: "/", src: BarChart3 },
  {
    title: "Purchase",
    path: "/purchase",
    src: ShoppingCart,
    adminAccess: true,
  },
  { title: "Orders", path: "/orders", src: ClipboardList },
  { title: "Products", path: "/products", src: Boxes, gap: true },
  { title: "Suppliers", path: "/suppliers", src: Users, adminAccess: true },
  {
    title: "Categories",
    path: "/categories",
    src: LayoutList,
    adminAccess: true,
  },
  { title: "Variants", path: "/variants", src: Network, adminAccess: true },
  {
    title: "Delivery Service",
    path: "/delivery-service",
    src: Truck,
    adminAccess: true,
  },
  {
    title: "Admins",
    path: "/admins",
    src: UserCog,
    gap: true,
    adminAccess: true,
  },
];
