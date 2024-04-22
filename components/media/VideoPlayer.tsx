"use client";
import { Video } from "@/types";
import { useState } from "react";
import { LoaderIcon } from "lucide-react";

const loaderIconSize = 48;

export default function VideoPlayer({ video }: { video: Video | null }) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div className="w-full aspect-video relative">
      {!videoLoaded && <LoaderIcon
        className={`animate-spin size-[64px] absolute top-[calc(50%-32px)] left-[calc(50%-32px)] opacity-40`}
      />}
      {video?.embedUrl && (
        <iframe
          src={video.embedUrl}
          className="w-full h-full rounded-lg relative"
          onLoad={() => {
            if (!videoLoaded) {
              setVideoLoaded(true);
            }
          }}
        ></iframe>
      )}
    </div>
  );
}
