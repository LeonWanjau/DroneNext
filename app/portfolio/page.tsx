import { Project, StrapiResponse } from "@/types";
import Image from "next/image";
import { Pages, defaultBlurredImageBase64, defaultImage, getImageSrc, getLinks } from "../functions";
import AppBarSpacer from "@/components/AppbarSpacer";
import Title from "@/components/Title";
import Link from "next/link";
import { doFetch } from "../api";

const gridColumns = [
  "md:col-start-1 md:col-end-3",
  "md:col-start-2 md:col-end-4",
];

const namePositions = [
  "md:right-0 md:bottom-0 md:translate-x-1/2 md:translate-y-1/2",
  "md:left-0 md:bottom-0 md:-translate-x-1/2 md:translate-y-1/2",
];

function getProjectPositions(index: number) {
  return `${gridColumns[index % 2]} ${namePositions[index % 2]}`;
}

export default async function Page() {
  const projectsRes = await doFetch({
    url: "/projects?populate[0]=backgroundImage",
    options: { method: "GET" },
  });
  const projects = ((await projectsRes.json()) as StrapiResponse<Project>).data;
  const portfolioLink = getLinks()[Pages.PORTFOLIO]?.href ?? "";

  // const projects: Project[] = [
  //   {
  //     title: "Project 1 Project 1 Project 1 Project 1 Project 1 Project 1 Project 1",
  //     // mainBackground:
  //     //   "https://drive.google.com/file/d/1iyHM0a2OEyHhNPSPHdxUSf3SyXSGLCkO/view?usp=drive_link",
  //   },
  //   {
  //     title: "Project 2",
  //     // mainBackground:
  //     //   "https://drive.google.com/file/d/1iyHM0a2OEyHhNPSPHdxUSf3SyXSGLCkO/view?usp=drive_link",
  //   },
  // ];

  return (
    <>
      <AppBarSpacer />
      <div className="container px-4 mt-8">
        <Title>Portfolio</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-12 md:gap-y-24 mt-8">
          {projects.map((project, index) => {
            const projectAttrs = project.attributes;
            const backgroundImageSrc = projectAttrs.backgroundImage?.data.attributes.link
            return (
              <div
                key={index}
                className={`relative h-[200px] row-span-1 transition-transform hover:scale-105 cursor-pointer ${/*gridColumns[index % 2]*/ ''}`}
              >
                <Link href={`${portfolioLink}/${project.id}`}>
                <Image
                  src={backgroundImageSrc ? getImageSrc(backgroundImageSrc) : defaultImage }
                  alt="project-image"
                  className="rounded object-cover shadow-md"
                  fill
                  placeholder={defaultBlurredImageBase64}
                />
                {/* <div
                  className={`absolute bg-secondary/50 backdrop-blur-sm text-secondary-foreground md:border-2 shadow-md
                   rounded-b md:rounded w-full md:w-auto p-2 bottom-0 md:left-1/2 md:-translate-x-1/2`}
                >
                  <div className="line-clamp-2 max-w-md">{projectAttrs.title}</div>
                </div> */}
                <div
                  className={`absolute bg-secondary/50 backdrop-blur-lg text-secondary-foreground shadow-inner
                   rounded-b w-full p-2 bottom-0 text-center text-lg ${/*namePositions[index % 2]*/ ''}`}
                >
                  {/* <div className="line-clamp-2 text-center">{projectAttrs.title}</div> */}
                  {projectAttrs.title}
                </div>
              </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
