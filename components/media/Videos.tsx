"use client";

import { Video } from "@/types";
import Title from "../Title";
import { Card } from "../ui/card";
import Image from "next/image";
import {
  defaultBlurredImageBase64,
  defaultVideoThumbnail,
  getMediaItemGridLayout,
} from "@/app/functions";
import { PlayCircle } from "lucide-react";
import MediaDialog from "./MediaDialog";
import VideoPlayer from "./VideoPlayer";
import { useState } from "react";

export default function Videos({ videos }: { videos: Video[] }) {
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <Title>Videos</Title>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 mt-4 auto-rows-[216px]">
        {videos.map((video, index) => (
          <Card
            key={index}
            className={`rounded overflow-hidden relative cursor-pointer ${getMediaItemGridLayout(
              index,
              videos.length,
              true
            )}`}
            onClick={() => {
              setCurrentVideo(video);
              setDialogOpen(true);
            }}
          >
            <Image
              src={video.thumbnail ?? defaultVideoThumbnail}
              blurDataURL={defaultBlurredImageBase64}
              alt="video"
              fill
              className="object-cover"
            />
            <PlayCircle
              className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 size-[64px]"
              color="white"
            />
          </Card>
        ))}
      </div>

      <MediaDialog open={dialogOpen} toggleDialog={setDialogOpen}>
        <VideoPlayer video={currentVideo} />
      </MediaDialog>
    </div>
  );
}
