"use client";

import { YoutubeVideo } from "@/types";
import Title from "../Title";

export default function YoutubeVideos({
  youtubeVideos,
}: {
  youtubeVideos: YoutubeVideo[];
}) {
  

  return (
    <div>
      <Title>Youtube Videos</Title>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 mt-4 auto-rows-[216px]"></div>
    </div>
  );
}
