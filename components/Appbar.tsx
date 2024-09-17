"use client";

import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { ModeToggle } from "./ToggleTheme";

const links = {
  Home: "/",
  Portfolio: "/",
  Contacts: "/",
};

export default function Appbar({ logo }: { logo: React.ReactNode }) {
  return (
    <div className="bg-primary/65 text-primary-foreground backdrop-blur fixed top-0 left-0 z-10 w-screen text-sm py-2">
      <div className="flex flex-col items-center gap-1 md:gap-0 md:flex-row justify-between px-4 container">
        {/* <Logo size="small" /> */}
        {logo}
        <div className="flex">
          <NavLinks />
          <div className="ml-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
