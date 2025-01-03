import Logo from "../Logo";
import NavLinks from "../NavLinks";
import { contactItems } from "../Contacts";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { doFetch } from "@/app/api";
import { Service, StrapiResponse } from "@/types";

const services = ["Property Tours", "Customization", "Event Coverage"];

export default function Footer({
  spacings,
  showGetFreeQuote = true,
  logo,
  services: serviceNames,
}: {
  spacings: string;
  showGetFreeQuote?: boolean;
  logo: React.ReactNode;
  services: string[];
}) {
  return (
    <div className={`relative`}>
      {showGetFreeQuote && (
        <div className={`md:container relative md:${spacings}`}>
          <div className="md:absolute md:top-0 md:-translate-y-1/2 md:rounded md:shadow-[0_16px_24px_8px_rgb(0,0,0,0.25)] overflow-hidden">
            <div
              className={`bg-secondary text-secondary-foreground py-16 md:py-14 flex flex-col md:flex-row 
              items-center gap-8 md:gap-16 ${spacings} md:px-10`}
            >
              <p className="text-center md:text-left font-bold text-xl md:max-w-[440px]">
                Contact us now, and get a free quote for your next project!
              </p>

              <Link href="/quote">
                <Button className="uppercase md:py-6 md:px-10">
                  Get a free qoute
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className={`bg-primary text-primary-foreground`}>
        <div
          className={`flex flex-col md:flex-row md:justify-between items-start ${spacings} gap-3 
            py-8 md:pb-16 ${
              showGetFreeQuote ? "md:pt-40" : "md:pt-14"
            } md:container relative text-lg`}
        >
          <div className="max-w-[400px]">
            {logo}
            <p className="text-md lg:text-xl mt-3 md:mt-6">
              We are a visual production company specializing in aerial drone
              video and photography
            </p>
          </div>
          <div>
            <p className="font-bold md:text-2xl">Services</p>
            <div className="mt-3 flex flex-col gap-2">
              {serviceNames.map((serviceName) => (
                <div key={serviceName} className="flex gap-2">
                  <ArrowRight size="20px" />
                  <p>{serviceName}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold md:text-2xl">Links</p>
            <div className="mt-3">
              <NavLinks inAppBar={false} />
            </div>
          </div>
          <div>
            <p className="font-bold md:text-2xl">Contact Us</p>
            <div className="flex flex-col gap-4 mt-3">
              {contactItems.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <item.icon />
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
