"use client";
import { useState } from "react";
import { LoaderIcon } from "lucide-react";

export default function VideoPlayer({ embedUrl }: { embedUrl: string | null | undefined }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  // const embedUrl = video?.link
  //   ? `https://drive.google.com/file/d/${getIdFromGDriveLink(
  //       video.link
  //     )}/preview`
  //   : youtubeVideo?.link
  //   ? `https://www.youtube.com/embed/${getVideoIdFromYoutubeLink(
  //       youtubeVideo.link
  //     )}`
  //   : null;

  return (
    <div className="w-full aspect-video relative">
      {!videoLoaded && (
        <LoaderIcon
          className={`animate-spin size-[64px] absolute top-[calc(50%-32px)] left-[calc(50%-32px)] opacity-40`}
        />
      )}
      {embedUrl && (
        <iframe
          src={embedUrl}
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
