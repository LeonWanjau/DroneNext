import AppBarSpacer from "@/components/AppbarSpacer";
import Media from "@/components/media/Media";
import { Image, Video } from "@/types";

export default function Page() {
  const videos: Video[] = [
    {
      src: "https://drive.google.com/file/d/10SAuwlOaI2x0pbLjsq3Zamlc8begsqGC/view?usp=drive_link",
      embedUrl:
        "https://drive.google.com/file/d/1R8SqDBXOcZ4GqXRnXQI3z6u1m-ENSiOL/preview",
    },
    {
      src: "https://drive.google.com/file/d/10SAuwlOaI2x0pbLjsq3Zamlc8begsqGC/view?usp=drive_link",
      embedUrl:
        "https://drive.google.com/file/d/1k8vgho2Pa2vq4ppfXhuyERzi3o_okSQF/preview",
    },
    {
      src: "https://drive.google.com/file/d/10SAuwlOaI2x0pbLjsq3Zamlc8begsqGC/view?usp=drive_link",
      embedUrl:
        "https://drive.google.com/file/d/1k8vgho2Pa2vq4ppfXhuyERzi3o_okSQF/preview",
    },
    {
      src: "https://drive.google.com/file/d/10SAuwlOaI2x0pbLjsq3Zamlc8begsqGC/view?usp=drive_link",
      embedUrl:
        "https://drive.google.com/file/d/1k8vgho2Pa2vq4ppfXhuyERzi3o_okSQF/preview",
    },
    {
      src: "https://drive.google.com/file/d/10SAuwlOaI2x0pbLjsq3Zamlc8begsqGC/view?usp=drive_link",
      embedUrl:
        "https://drive.google.com/file/d/1k8vgho2Pa2vq4ppfXhuyERzi3o_okSQF/preview",
    },
  ];

  const images: Image[] = [
    {
      src: "https://drive.google.com/thumbnail?id=1iyHM0a2OEyHhNPSPHdxUSf3SyXSGLCkO&sz=w1000",
    },
    {
      src: "https://drive.google.com/file/d/1iyHM0a2OEyHhNPSPHdxUSf3SyXSGLCkO/view?usp=drive_link",
    },
    {
      src: "https://drive.google.com/thumbnail?id=1iyHM0a2OEyHhNPSPHdxUSf3SyXSGLCkO&sz=w1000",
    },
    {
      src: "https://drive.google.com/thumbnail?id=1iyHM0a2OEyHhNPSPHdxUSf3SyXSGLCkO&sz=w1000",
    },
    {
      src: "https://drive.google.com/thumbnail?id=1iyHM0a2OEyHhNPSPHdxUSf3SyXSGLCkO&sz=w1000",
    },
    {
      src: "https://drive.google.com/thumbnail?id=1iyHM0a2OEyHhNPSPHdxUSf3SyXSGLCkO&sz=w1000",
    },
    {
      src: "https://drive.google.com/file/d/1iyHM0a2OEyHhNPSPHdxUSf3SyXSGLCkO/view?usp=drive_link",
    },
  ];

  return (
    <div>
      <AppBarSpacer />
      <div className="container px-4 mt-8 md:mt-8">
        <Media videos={videos} images={images} />
      </div>
    </div>
  );
}
