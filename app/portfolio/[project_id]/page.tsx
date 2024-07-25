import { doFetch } from "@/app/api";
import {
  VideoType,
  defaultImage,
  getIdFromGDriveLink,
  getImageSrc,
} from "@/app/functions";
import Images from "@/components/media/Images";
import Videos from "@/components/media/Videos";
import YoutubePlayer from "@/components/media/YoutubePlayer";
import {
  Image,
  Project,
  SingleStrapiResponse,
  StrapiResponse,
  Video,
} from "@/types";
import NextImage from "next/image";

export async function generateStaticParams() {
  const projectsRes = await doFetch({
    url: "/projects?populate[0]=backgroundImage",
    options: { method: "GET" },
  });
  const projects = ((await projectsRes.json()) as StrapiResponse<Project>).data;
  return projects.map((project) => ({ project_id: project.id.toString() }));
}

export default async function Page({
  params,
}: {
  params?: { project_id?: string };
}) {
  const url = `/projects/${params?.project_id}?populate[0]=backgroundImage&populate[1]=images&populate[2]=videos&populate[3]=youtubeVideos`;
  const projectsRes = await doFetch({
    url,
    options: { method: "GET" },
  });
  const project = (await projectsRes.json()) as SingleStrapiResponse<Project>;
  const projectAttrs = project.data.attributes;
  const backgroundImageSrc = projectAttrs.backgroundImage?.data.attributes.link;
  const images = projectAttrs.images?.data.map((item) => item.attributes) ?? [];
  const videos = projectAttrs.videos?.data.map((item) => item.attributes) ?? [];
  const youtubeVideos =
    projectAttrs.youtubeVideos?.data.map((item) => item.attributes) ?? [];
  console.log(projectAttrs);

  // const project: Project = {
  //   title: "Project Name",
  //   description: `Long description Long description Long description Long description Long description Long description Long description
  //   Long description Long description Long description Long description Long description Long description Long description
  //   Long description Long description Long description Long description Long description Long description Long description
  //   Long description Long description Long description Long description Long description Long description Long description Long description
  //   Long description Long description Long description Long description Long description Long description Long description Long description Long description
  //   `,
  //   client: "Client",
  //   date: "05/01/2024",
  //   // backgroundImage:
  //   //   "https://drive.google.com/file/d/1iyHM0a2OEyHhNPSPHdxUSf3SyXSGLCkO/view?usp=drive_link",
  // };

  // const images: Image[] = [
  //   {
  //     link: "https://drive.google.com/thumbnail?id=1iyHM0a2OEyHhNPSPHdxUSf3SyXSGLCkO&sz=w1000",
  //   },
  //   {
  //     link: "https://drive.google.com/file/d/1iyHM0a2OEyHhNPSPHdxUSf3SyXSGLCkO/view?usp=drive_link",
  //   },
  //   {
  //     link: "https://drive.google.com/thumbnail?id=1iyHM0a2OEyHhNPSPHdxUSf3SyXSGLCkO&sz=w1000",
  //   },
  //   {
  //     link: "https://drive.google.com/thumbnail?id=1iyHM0a2OEyHhNPSPHdxUSf3SyXSGLCkO&sz=w1000",
  //   },
  //   {
  //     link: "https://drive.google.com/thumbnail?id=1iyHM0a2OEyHhNPSPHdxUSf3SyXSGLCkO&sz=w1000",
  //   },
  //   {
  //     link: "https://drive.google.com/thumbnail?id=1iyHM0a2OEyHhNPSPHdxUSf3SyXSGLCkO&sz=w1000",
  //   },
  //   {
  //     link: "https://drive.google.com/file/d/1iyHM0a2OEyHhNPSPHdxUSf3SyXSGLCkO/view?usp=drive_link",
  //   },
  // ];
  // const videos: Video[] = [
  //   {
  //     link: "https://drive.google.com/file/d/10SAuwlOaI2x0pbLjsq3Zamlc8begsqGC/view?usp=drive_link",
  //     embedUrl:
  //       "https://drive.google.com/file/d/1R8SqDBXOcZ4GqXRnXQI3z6u1m-ENSiOL/preview",
  //   },
  //   {
  //     link: "https://drive.google.com/file/d/10SAuwlOaI2x0pbLjsq3Zamlc8begsqGC/view?usp=drive_link",
  //     embedUrl:
  //       "https://drive.google.com/file/d/1k8vgho2Pa2vq4ppfXhuyERzi3o_okSQF/preview",
  //   },
  //   {
  //     link: "https://drive.google.com/file/d/10SAuwlOaI2x0pbLjsq3Zamlc8begsqGC/view?usp=drive_link",
  //     embedUrl:
  //       "https://drive.google.com/file/d/1k8vgho2Pa2vq4ppfXhuyERzi3o_okSQF/preview",
  //   },
  //   {
  //     link: "https://drive.google.com/file/d/10SAuwlOaI2x0pbLjsq3Zamlc8begsqGC/view?usp=drive_link",
  //     embedUrl:
  //       "https://drive.google.com/file/d/1k8vgho2Pa2vq4ppfXhuyERzi3o_okSQF/preview",
  //   },
  //   {
  //     link: "https://drive.google.com/file/d/10SAuwlOaI2x0pbLjsq3Zamlc8begsqGC/view?usp=drive_link",
  //     embedUrl:
  //       "https://drive.google.com/file/d/1k8vgho2Pa2vq4ppfXhuyERzi3o_okSQF/preview",
  //   },
  // ];
  return (
    <div>
      <div className="relative h-[min(80vh,auto)] lg:h-[auto] lg:pt-28 pt-28 pb-12 lg:py-24">
        <NextImage
          src={
            backgroundImageSrc ? getImageSrc(backgroundImageSrc) : defaultImage
          }
          fill
          alt="Banner Image"
          className="absolute left-0 top-0 object-cover blur-sm"
        />
        <div className="absolute left-0 top-0 w-full h-full bg-foreground/40 dark:bg-background/30" />
        <div
          className="font-bold text-sm md:text-base px-4
              container relative"
        >
          <div
            className="text-primary-foreground  rounded-lg inline-block flex flex-col 
            gap-y-4 md:gap-y-8 bg-secondary/25 p-4"
          >
            <div className="text-xl lg:text-5xl lg:leading-normal">
              {projectAttrs.title}
            </div>
            {projectAttrs.description && (
              <div className="line-clamp-10">{projectAttrs.description}</div>
            )}
            {projectAttrs.client && <div>Client: {projectAttrs.client}</div>}
            {projectAttrs.date && <div>Date: {projectAttrs.date}</div>}
          </div>
        </div>
      </div>

      <div className="container px-4 mt-8 md:mt-24 flex flex-col gap-y-16">
        {youtubeVideos.length > 0 && (
          <Videos
            title="Youtube Videos"
            videoType={VideoType.YOUTUBE}
            videos={youtubeVideos}
          />
        )}
        {images.length > 0 && <Images images={images} />}
        {videos.length > 0 && (
          <Videos
            title="Videos"
            videoType={VideoType.GOOGLE_DRIVE}
            videos={videos}
          />
        )}
      </div>
    </div>
  );
}
