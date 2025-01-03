"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ShowFooter({
  logo,
  serviceNames,
}: {
  logo: React.ReactNode;
  serviceNames: string[];
}) {
  const pathname = usePathname();
  const currentPageIsQuote = pathname.includes("/quote");

  return (
    <div
      className={`mt-8 ${
        currentPageIsQuote ? "md:mt-[126px]" : "md:mt-[210px]"
      }`}
    >
      <Footer
        spacings="px-4 md:px-4"
        showGetFreeQuote={!currentPageIsQuote}
        logo={logo}
        services={serviceNames}
      />
    </div>
  );
}
