import Image from "next/image";
import BannerImg from "@/assets/images/banner.jpg";
import { defaultBlurredImageBase64 } from "../functions";
import Contacts from "@/components/Contacts";

export default function Page() {
  return (
    <div className="mb-[280px]">
      <div className="relative md:h-[490px] flex flex-col items-center justify-center">
        <Image
          src={BannerImg}
          fill
          alt="Banner Image"
          className="absolute left-0 top-0 object-cover"
          placeholder={defaultBlurredImageBase64}
        />
        <div className="absolute left-0 top-0 w-full h-full bg-foreground/30 dark:bg-background/30" />
        <p className="relative text-6xl font-bold text-primary-foreground container px-4">
          Contacts
        </p>
        <div className="container px-4">
          <div className="absolute w-2/3 bottom-0 translate-y-3/4">
            <Contacts showTitle={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
