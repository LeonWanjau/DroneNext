"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import AerialHome from "@/assets/images/aerial-home.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

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

export default function Services() {
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
      <p className="font-bold text-3xl md:text-4xl text-center lg:text-start">Our Services</p>
      <Carousel setApi={setApi} className="mt-4 md:mt-6">
        <CarouselContent>
          {services.map((service, index) => (
            <CarouselItem className="basis-full lg:basis-1/3 flex" key={index}>
              {/* Padding 1 stops left border of content from being cut off on large screens and bottom border from being
              cut off on small screens */}
              <div className="p-[1px]">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={AerialHome}
                      alt="aerial home"
                      className="w-full rounded ring-1"
                    />
                    <div className="mt-4">
                      {service.details.map((detail, index) => (
                        <p key={index}>{detail}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex gap-1 mt-4">
          {services.map((_, index) => (
            <Button
              key={index}
              className={`basis-1/${services.length} md:basis-[80px] h-[8px] p-0 ${
                current - 1 === index
                  ? "bg-foreground/80 hover:bg-foreground/80"
                  : "bg-muted-foreground/80 hover:bg-foreground/60"
              }`}
              onClick={() => {
                api?.scrollTo(index);
              }}
            ></Button>
          ))}
        </div>
      </Carousel>
    </div>
  );
}
