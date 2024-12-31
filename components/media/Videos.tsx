"use client";

import { Video, YoutubeVideo } from "@/types";
import Title from "../Title";
import { Card } from "../ui/card";
import Image from "next/image";
import {
  MediaTypes,
  defaultBlurredImageBase64,
  getIdFromGDriveLink,
  getImageSrc,
  getMediaItemGridLayout,
  getVideoIdFromYoutubeLink,
} from "@/app/functions";
import { PlayCircle } from "lucide-react";
import MediaDialog from "./MediaDialog";
import VideoPlayer from "./VideoPlayer";
import { useEffect, useState } from "react";
import {
  useGetItemsBasedOnPageNumber,
  useGetPageNumber,
} from "@/app/client-functions";
import Pagination from "../Pagination";

export default function Videos({
  title = "Videos",
  videos = [],
  mediaType = MediaTypes.VIDEO,
}: {
  title?: string;
  videos?: Video[] | YoutubeVideo[];
  mediaType?: MediaTypes;
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
  const currentPage = useGetPageNumber(mediaType);
  const selectedVideos = useGetItemsBasedOnPageNumber(currentPage, videos);
  const [titleId, setTitleId] = useState<string>("videos");

  useEffect(() => {
    switch (mediaType) {
      case MediaTypes.VIDEO:
        setTitleId("gdrive-videos");
        setGetThumbnailUrl(() => getImageSrc);
        setGetEmbedUrl(
          () => (link: string) =>
            `https://drive.google.com/file/d/${getIdFromGDriveLink(
              link ?? ""
            )}/preview`
        );
        break;
      case MediaTypes.YOUTUBE:
        setTitleId("youtube-videos");
        setGetThumbnailUrl(() => (link: string) => {
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
  }, [mediaType]);

  return (
    <div>
      <div id={titleId} className="md:scroll-mt-24">
        <Title>{title}</Title>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {selectedVideos.map((video, index) => {
          return (
            <Card
              key={index}
              className={`rounded overflow-hidden relative transition-transform hover:scale-[1.03] cursor-pointer
                col-span-1 aspect-[2/1]`}
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

      <div className="mt-8 mt-4">
        <Pagination
          numberOfItems={videos.length}
          currentPage={currentPage}
          mediaType={mediaType}
          urlHash={titleId}
        />
      </div>

      <MediaDialog open={dialogOpen} toggleDialog={setDialogOpen}>
        <VideoPlayer embedUrl={getEmbedUrl(currentVideo?.link ?? "")} />
      </MediaDialog>
    </div>
  );
}
