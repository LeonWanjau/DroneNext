"use client";

import { Image } from "@/types";
import Title from "../Title";
import { Card } from "../ui/card";
import { useState } from "react";
import MediaDialog from "./MediaDialog";
import NextImage from "next/image";
import {
  MediaTypes,
  defaultBlurredImageBase64,
  getImageSrc,
  getMediaItemGridLayout,
} from "@/app/functions";
import {
  useGetItemsBasedOnPageNumber,
  useGetPageNumber,
} from "@/app/client-functions";
import Pagination from "../Pagination";

export default function Images({ images }: { images: Image[] }) {
  const [currentImage, setCurrentImage] = useState<Image | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const currentPage = useGetPageNumber(MediaTypes.IMAGE);
  const selectedImages = useGetItemsBasedOnPageNumber(currentPage, images);

  return (
    <div>
      <div id="images" className="md:scroll-mt-24">
        <Title>Images</Title>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {selectedImages.map((image, index) => {
          return (
            <Card
              key={index}
              className={`rounded overflow-hidden relative transition-transform hover:scale-[1.03] cursor-pointer
                col-span-1 aspect-[2/1]`}
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

      <div className="mt-8 md:mt-4">
        <Pagination
          numberOfItems={images.length}
          currentPage={currentPage}
          mediaType={MediaTypes.IMAGE}
          urlHash="images"
        />
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
