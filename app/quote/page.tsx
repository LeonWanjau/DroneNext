import AppBarSpacer from "@/components/AppbarSpacer";
import Quote from "./Quote";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Img from "@/assets/images/aerial-1.jpg";
import { doFetch } from "../api";
import { QuoteInfo, SingleStrapiResponse } from "@/types";
import { getImageSrc } from "../functions";

export default async function Page() {
  const quoteResp = await doFetch({
    url: "/quote-info?populate[0]=image&populate[1]=droneUses",
    options: { method: "GET" },
  });
  const quoteInfo = (await quoteResp.json()) as SingleStrapiResponse<QuoteInfo>;
  const quoteAttrs = quoteInfo.data.attributes;
  const imageSrc = quoteAttrs.image?.data.attributes.link;
  const droneUses = quoteAttrs.droneUses?.data
    .filter((item) => !!item.attributes.droneUse)
    .map((item) => item.attributes.droneUse) as string[];
  console.log(droneUses)

  return (
    <div className="container px-4">
      <AppBarSpacer />
      <Card className="mt-8 overflow-hidden">
        <CardContent className="p-2 md:pl-0 md:pt-0 md:pb-0">
          <div className="flex">
            <div className="basis-0 grow relative hidden md:block">
              <Image
                src={imageSrc ? getImageSrc(imageSrc) : Img}
                alt="free quote image"
                className="object-cover min-width-0 absolute h-full"
                fill
              />
            </div>
            <div className="py-4 grow md:grow-0 flex flex-col items-stretch md:pl-8 basis-2/3">
              <p className="text-2xl font-bold text-center md:text-left">
                Get a Free Quote
              </p>
              <div className="mt-8">
                <Quote droneUses={droneUses}/>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
