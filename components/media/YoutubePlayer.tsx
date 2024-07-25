"use client";

import { YoutubeVideo } from "@/types";
import { useState } from "react";

export default function YoutubePlayer() {
/*{
  youtubeVideo,
}: {
  youtubeVideo: YoutubeVideo;
}*/

    // Thumbnail
    // https://i.ytimg.com/vi/i_U6uqIaz70/hqdefault.jpg

  const [videoLoaded, setVideoLoaded] = useState(false);
  const embedUrl = ``;

  return (
    <div className="w-full aspect-video relative">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/eFKV5q-QVas"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
         picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}
