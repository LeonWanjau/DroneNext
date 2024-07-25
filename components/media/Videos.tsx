"use client";

import { Video, YoutubeVideo } from "@/types";
import Title from "../Title";
import { Card } from "../ui/card";
import Image from "next/image";
import {
  VideoType,
  defaultBlurredImageBase64,
  defaultVideoThumbnail,
  getIdFromGDriveLink,
  getImageSrc,
  getMediaItemGridLayout,
  getVideoIdFromYoutubeLink,
} from "@/app/functions";
import { PlayCircle } from "lucide-react";
import MediaDialog from "./MediaDialog";
import VideoPlayer from "./VideoPlayer";
import { useEffect, useState } from "react";

export default function Videos({
  title,
  videos = [],
  videoType,
}: {
  title: string;
  videos?: Video[] | YoutubeVideo[];
  videoType: VideoType;
}) {
  const [currentVideo, setCurrentVideo] = useState<Video | YoutubeVideo | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [getThumbnailUrl, setGetThumbnailUrl] = useState<
    (link: string) => string | null
  >(() => () => null);
  const [getEmbedUrl, setGetEmbedUrl] = useState<
    (link: string) => string | null
  >(() => () => null);

  useEffect(() => {
    switch (videoType) {
      case VideoType.GOOGLE_DRIVE:
        setGetThumbnailUrl(() => getImageSrc);
        setGetEmbedUrl(
          () => (link: string) =>
            `https://drive.google.com/file/d/${getIdFromGDriveLink(
              link ?? ""
            )}/preview`
        );
        break;
      case VideoType.YOUTUBE:
        setGetThumbnailUrl(() => (link: string) => {
          console.log(link)
          console.log(getVideoIdFromYoutubeLink(link))
          return `https://i.ytimg.com/vi/${getVideoIdFromYoutubeLink(
            link
          )}/hqdefault.jpg`;
        });
        setGetEmbedUrl(
          () => (link: string) =>
            `https://www.youtube.com/embed/${getVideoIdFromYoutubeLink(link)}`
        );
        break;
    }
  }, []);

  return (
    <div>
      <Title>{title}</Title>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 mt-4 auto-rows-[216px]">
        {videos.map((video, index) => {
          return (
            <Card
              key={index}
              className={`rounded overflow-hidden relative transition-transform hover:scale-[1.03] cursor-pointer ${getMediaItemGridLayout(
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
                src={
                  video.link
                    ? getThumbnailUrl(video.link) ?? defaultBlurredImageBase64
                    : defaultBlurredImageBase64
                }
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
          );
        })}
      </div>

      <MediaDialog open={dialogOpen} toggleDialog={setDialogOpen}>
        <VideoPlayer embedUrl={getEmbedUrl(currentVideo?.link ?? "")} />
      </MediaDialog>
    </div>
  );
}
