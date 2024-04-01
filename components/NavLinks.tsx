"use client";
import { Contact, File, Folder, HomeIcon, LucideIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";

export default function NavLinks({ inAppBar = true }: { inAppBar?: boolean }) {
  const links: { label: string; href: string; icon: LucideIcon }[] = [
    { label: "Home", href: "/", icon: HomeIcon },
    { label: "Portfolio", href: "/", icon: Folder },
  ];
  if (inAppBar) {
    links.push({ label: "Contacts", href: "/", icon: Contact });
  }
  return (
    <NavigationMenu className="w-full md:w-auto">
      <NavigationMenuList
        className={inAppBar ? "flex gap-2" : "flex flex-col gap-3 items-start"}
      >
        {links.map(({ label, href, icon: Icon }) => (
          <NavigationMenuItem
            key={label}
            className={`${inAppBar && navigationMenuTriggerStyle()} 
            bg-transparent text-primary-foreground
            ${inAppBar ? " py-1 px-4 " : "!px-0 !pt-0 !ml-0"}`}
          >
            <Link href={href}>
              <div className="flex items-center gap-2">
                {!inAppBar && <Icon />} {label}
              </div>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
