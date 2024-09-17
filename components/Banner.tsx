import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import BannerImage from "@/assets/images/banner.jpg";
import DroneImage from "@/assets/images/drone.png";
import { doFetch } from "@/app/api";
import { BannerItem, StrapiResponse } from "@/types";
import {
  defaultBlurredImageBase64,
  getCompanyInfo,
  getImageSrc,
} from "@/app/functions";
import ImageIframe from "./ImageIframe";

const carouselItems = [
  {
    src: BannerImage,
    text: "Main Text Here",
  },
  {
    src: BannerImage,
    text: "More text here",
  },
];

export default async function Banner() {
  const bannerRes = await doFetch({
    url: "/banners",
    options: { method: "GET" },
  });
  const bannerItems = (await bannerRes.json()) as StrapiResponse<BannerItem>;

  const companyInfo = await getCompanyInfo();

  return (
    <Carousel className="">
      <CarouselContent className="h-[min(80vh,864px)]">
        {bannerItems.data.map((bannerItem) => {
          const bannerItemAttrs = bannerItem.attributes;
          return (
            <CarouselItem key={bannerItem.id} className="relative">
              <Image
                src={
                  bannerItemAttrs?.image
                    ? getImageSrc(bannerItemAttrs.image)
                    : BannerImage
                }
                fill
                alt="Banner Image"
                className="absolute left-0 top-0 object-cover"
                placeholder={defaultBlurredImageBase64}
              />
              {/* <ImageIframe src={bannerItemAttrs.image} /> */}
              <div className="absolute left-0 top-0 w-full h-full bg-foreground/30 dark:bg-background/30" />
              <div
                className="font-bold text-xl top-[calc(50%+56px)] px-4 
            -translate-y-1/2
             lg:top-1/2  lg:left-[6rem] lg:px-8 container relative"
              >
                {/* bg-primary/50 backdrop-blur-sm py-1 px-4 */}
                <div className="text-primary-foreground  rounded-lg inline-block">
                  <span className="lg:text-5xl lg:leading-normal">
                    {bannerItemAttrs.bannerText}
                  </span>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="container absolute top-1/2 left-1/2 -translate-x-1/2">
        <CarouselPrevious className="left-4 lg:left-4 ring ring-current" />
        <CarouselNext className="right-4 lg:right-4 ring ring-current" />
      </div>
      <div
        className="bg-primary/80 backdrop-blur-sm text-primary-foreground py-4 lg:py-8 px-4 absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 
        rounded-lg flex align-start  container w-[calc(100%-2rem)] md:max-w-screen-sm lg:max-w-screen-md 2xl:max-w-screen-lg"
      >
        <div className="text-sm lg:text-xl font-bold">
          {companyInfo.description}
        </div>
        <div className="w-1/4 relative hidden md:block">
          <Image
            src={DroneImage}
            alt="Drone Image"
            className="absolute object-contain max-w-[none] left-0 top-1/2 -translate-y-1/2 md:w-[160%] lg:w-[210%] 2xl:w-[200%]"
          />
        </div>
      </div>
    </Carousel>
  );
}
