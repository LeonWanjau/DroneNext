import { doFetch } from "@/app/api";
import { defaultBlurredImageBase64, getImageSrc } from "@/app/functions";
import MissionImg from "@/assets/images/aerial-1.jpg";
import { PhilosophyAndMission, SingleStrapiResponse } from "@/types";
import Image from "next/image";

export default async function Mission() {
  const res = await doFetch({
    url: "/philosophy-and-mission",
  });
  const philosophyAndMission =
    (await res.json()) as SingleStrapiResponse<PhilosophyAndMission>;
  const philosophyAndMissionAttrs = philosophyAndMission.data.attributes;

  return (
    <div className="h-[540px] relative">
      <Image
        src={
          philosophyAndMissionAttrs?.backgroundImage
            ? getImageSrc(philosophyAndMissionAttrs.backgroundImage)
            : MissionImg
        }
        alt="mission image"
        className="absolute top-0 left-0 h-full object-cover opacity-30"
        fill
        placeholder={defaultBlurredImageBase64}
      />
      <div
        className="absolute top-0 left-0 w-full h-full shadow-[0_0_24px_24px_hsl(var(--background))_inset]"
        style={{
          background:
            "radial-gradient(circle at 0 0, hsl(var(--background)), hsl(var(--background)) 20%, transparent 70%)",
        }}
      />
      {/* <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background:
            "radial-gradient(ellipse closest-side at center, transparent, transparent 90%,hsl(var(--background)), hsl(var(--background)));",
        }}
      /> */}
      <div className="flex flex-col relative relative flex container px-4 pt-4">
        <p className="text-3xl md:text-4xl text-center md:text-start font-bold">
          {philosophyAndMissionAttrs.title}
        </p>
        <p className="text-base md:text-xl leading-8 mt-6 max-w-[620px]">
          {philosophyAndMissionAttrs?.description}
        </p>
      </div>
    </div>
  );
}
