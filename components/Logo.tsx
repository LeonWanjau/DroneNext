import { defaultBlurredImageBase64, getImageSrc } from "@/app/functions";
import { getCompanyInfo } from "@/app/server-functions";
import Image from "next/image";
import Link from "next/link";

export default async function Logo({
  onDark = true,
  size = "normal",
}: {
  onDark?: boolean;
  size?: "small" | "normal" | "large";
}) {
  const companyInfo = await getCompanyInfo();
  const textColor = onDark ? "text-primary-foreground" : "text-primary";
  let iconSize: string;
  let fontSize: string;
  switch (size) {
    case "small":
      iconSize = "size-[16px] md:size-[28px]";
      fontSize = "text-base md:text-2xl";
      break;
    case "normal":
      iconSize = "size-[28px] md:size-[36px]";
      fontSize = "text-lg md:text-3xl";
      break;
    case "large":
      iconSize = "size-[28px] md:size-[36px]";
      fontSize = "text-xl md:text-4xl";
      break;
  }
  return (
    <Link href="/">
      <div className="flex gap-1 items-center">
        <p className={`${fontSize} font-bold`}>{companyInfo.companyName}</p>
        {/* <Lightbulb className={`${iconSize}`} /> */}
        <div className={`relative bg-transparent ${iconSize}`}>
          <Image
            src={
              getImageSrc(companyInfo.logo.data.attributes.link)
            }
            className="bg-transparent"
            fill
            alt="company logo"
            placeholder={defaultBlurredImageBase64}
          />
        </div>
      </div>
    </Link>
  );
}
