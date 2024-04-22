import { Image, Video } from "@/types";
import Videos from "./Videos";
import Images from "./Images";

export default function Media({
  videos,
  images,
}: {
  videos: Video[];
  images: Image[];
}) {
  return (
    <div>
      <Images images={images} />
      <div className="mt-8 md:mt-16" />
      <Videos videos={videos} />
    </div>
  );
}
