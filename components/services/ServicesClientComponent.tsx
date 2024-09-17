"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import AerialHome from "@/assets/images/aerial-home.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Service, StrapiResource, StrapiResponse } from "@/types";
import { defaultBlurredImageBase64, getImageSrc } from "@/app/functions";
import { ArrowLeft, ArrowRight } from "lucide-react";

const services = [
  {
    name: "Property Tours",
    details: ["Construction", "Landmarks", "Flyovers and Walkthroughs"],
  },
  {
    name: "Property Tours",
    details: ["Construction", "Landmarks", "Flyovers and Walkthroughs"],
  },
  {
    name: "Property Tours",
    details: ["Construction", "Landmarks"],
  },
  {
    name: "Property Tours",
    details: ["Construction", "Landmarks", "Flyovers and Walkthroughs"],
  },
  {
    name: "Property Tours",
    details: ["Construction", "Landmarks", "Flyovers and Walkthroughs"],
  },
];

export default function ServicesClientComponent({
  services,
}: {
  services: StrapiResponse<Service>;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    api.reInit({ loop: true });
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div>
      <p className="font-bold text-3xl md:text-4xl text-center lg:text-start">
        Our Services
      </p>
      <Carousel setApi={setApi} className="mt-4 md:mt-6">
        <CarouselContent>
          {Array.isArray(services.data) &&
            services?.data.map((service, index) => (
              <CarouselItem
                className="basis-full lg:basis-1/3 flex"
                key={index}
              >
                {/* Padding 1 stops left border of content from being cut off on large screens and bottom border from being
              cut off on small screens */}
                <div className="p-[1px] w-full">
                  <Card className="h-full w-full">
                    <CardHeader>
                      <CardTitle>{service.attributes.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[220px] lg:h-[330px] w-full relative">
                        <Image
                          src={
                            service.attributes.image?.data.attributes.link
                              ? getImageSrc(
                                  service.attributes.image?.data.attributes.link
                                )
                              : AerialHome
                          }
                          alt="aerial home"
                          className="rounded object-cover"
                          fill
                          placeholder={defaultBlurredImageBase64}
                        />
                      </div>
                      <div className="mt-4">
                        {service.attributes?.serviceDetails.data.map(
                          (detail, index) => (
                            <p key={index}>{detail.attributes.name}</p>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>

        {/* <div className="md:hidden mt-4 flex justify-between">
        <CarouselPrevious className="static translate-y-0" />
        <CarouselNext className="static translate-y-0" />
      </div> */}

        {services.data.length > 3 && (
          // <div className="flex gap-1 mt-4">
          //   {services.data.map((_, index) => (
          //     <Button
          //       key={index}
          //       className={`basis-1/${
          //         services.data.length
          //       } md:basis-[80px] h-[8px] p-0 ${
          //         current - 1 === index
          //           ? "bg-foreground/80 hover:bg-foreground/80"
          //           : "bg-muted-foreground/80 hover:bg-foreground/60"
          //       }`}
          //       onClick={() => {
          //         api?.scrollTo(index);
          //       }}
          //     ></Button>
          //   ))}
          // </div>
          // <div className="">
          <div className="gap-8 md:gap-4 w-full justify-center mt-4 flex">
            <Button
              size="icon"
              className="rounded-full"
              onClick={() => {
                api?.scrollTo((current - 2) % services.data.length);
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Previous service</span>
            </Button>
            <Button
              size="icon"
              className="rounded-full"
              onClick={() => {
                api?.scrollTo(current % services.data.length);
              }}
            >
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Next service</span>
            </Button>
          </div>
          // </div>
        )}
      </Carousel>
    </div>
  );
}
