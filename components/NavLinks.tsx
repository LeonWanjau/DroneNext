"use client";
import { Contact, File, Folder, HomeIcon, LucideIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";
import { getLinks } from "@/app/functions";

export default function NavLinks({ inAppBar = true }: { inAppBar?: boolean }) {
  const links = getLinks(inAppBar);
  return (
    <NavigationMenu className="w-full md:w-auto">
      <NavigationMenuList
        className={inAppBar ? "flex gap-2" : "flex flex-col gap-3 items-start"}
      >
        {Object.entries(links).map(([page,{ label, href, icon: Icon }]) => (
          <Link href={href} key={page}>
            <NavigationMenuItem
              key={label}
              className={`${inAppBar && navigationMenuTriggerStyle()} 
            bg-transparent text-primary-foreground
            ${inAppBar ? " py-1 px-4 " : "!px-0 !pt-0 !ml-0"}`}
            >
              <div className="flex items-center gap-2">
                {!inAppBar && <Icon />} {label}
              </div>
            </NavigationMenuItem>
          </Link>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
