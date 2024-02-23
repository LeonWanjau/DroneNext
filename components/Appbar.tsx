"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const links = {
  Home: "/",
  Portfolio: "/",
  Contacts: "/",
};

export default function Appbar() {
  return (
    <div className="bg-primary/65 backdrop-blur fixed top-0 left-0 z-10 w-screen text-sm py-2">
      <div className="flex justify-end px-4 container">
        <NavigationMenu className="w-full md:w-auto">
          <NavigationMenuList className="flex gap-2">
            {Object.entries(links).map(([label, href]) => (
              <NavigationMenuItem
                key={label} className={`${navigationMenuTriggerStyle()} bg-transparent py-1 px-4 text-primary-foreground`}
              >
                <Link href={href}>{label}</Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
