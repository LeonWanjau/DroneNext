import { Project, StrapiResponse } from "@/types";
import Image from "next/image";
import {
  Pages,
  defaultBlurredImageBase64,
  defaultImage,
  getImageSrc,
  getLinks,
} from "../functions";
import AppBarSpacer from "@/components/AppbarSpacer";
import Title from "@/components/Title";
import Link from "next/link";
import { doFetch } from "../api";
import PortfolioClientComponent from "./PortfolioClientComponent";

export default async function Page() {
  const projectsRes = await doFetch({
    url: "/projects?populate[0]=backgroundImage&sort=id:desc",
    options: { method: "GET" },
  });
  const projects = ((await projectsRes.json()) as StrapiResponse<Project>).data;
  // const portfolioLink = getLinks()[Pages.PORTFOLIO]?.href ?? "";

  return (
    <>
      <AppBarSpacer />
      <div id="portfolio" className="container px-4 mt-8 md:scroll-mt-24">
        <Title>Portfolio</Title>
        <PortfolioClientComponent projects={projects} />
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-12 md:gap-y-24 mt-8">
          {projects.map((project, index) => {
            const projectAttrs = project.attributes;
            const backgroundImageSrc =
              projectAttrs.backgroundImage?.data.attributes.link;
            return (
              <div
                key={index}
                className={`relative h-[200px] row-span-1 transition-transform hover:scale-105 cursor-pointer`}
              >
                <Link href={`${portfolioLink}/${project.id}`}>
                  <Image
                    src={
                      backgroundImageSrc
                        ? getImageSrc(backgroundImageSrc)
                        : defaultImage
                    }
                    alt="project-image"
                    className="rounded object-cover shadow-md"
                    fill
                    placeholder={defaultBlurredImageBase64}
                  />
                  <div
                    className={`absolute bg-secondary/50 backdrop-blur-lg text-secondary-foreground shadow-inner
                   rounded-b w-full p-2 bottom-0 text-center text-lg`}
                  >
                    {projectAttrs.title}
                  </div>
                </Link>
              </div>
            );
          })}
        </div> */}
      </div>
    </>
  );
}
