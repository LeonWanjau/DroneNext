"use client";

import { Image } from "@/types";
import Title from "../Title";
import { Card } from "../ui/card";
import { useState } from "react";
import MediaDialog from "./MediaDialog";
import NextImage from "next/image";
import {
  defaultBlurredImageBase64,
  getImageSrc,
  getMediaItemGridLayout,
} from "@/app/functions";

export default function Images({ images }: { images: Image[] }) {
  const [currentImage, setCurrentImage] = useState<Image | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <Title>Images</Title>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 mt-4 auto-rows-[216px]">
        {images.map((image, index) => {
          return (
            <Card
              key={index}
              className={`rounded overflow-hidden relative transition-transform hover:scale-[1.03] cursor-pointer ${getMediaItemGridLayout(
                index,
                images.length
              )}`}
              onClick={() => {
                setCurrentImage(image);
                setDialogOpen(true);
              }}
            >
              <NextImage
                src={getImageSrc(image.link)}
                blurDataURL={defaultBlurredImageBase64}
                alt="video"
                className={`object-cover`}
                fill
              />
            </Card>
          );
        })}
      </div>

      <MediaDialog open={dialogOpen} toggleDialog={setDialogOpen}>
        {currentImage?.link && (
          <div className="w-full aspect-video relative">
            <NextImage
              src={getImageSrc(currentImage.link)}
              blurDataURL={defaultBlurredImageBase64}
              alt="image"
              className="object-cover"
              fill
            />
          </div>
        )}
      </MediaDialog>
    </div>
  );
}
