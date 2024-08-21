"use client";

import { Project, StrapiResource } from "@/types";
import {
  useGetItemsBasedOnPageNumber,
  useGetPageNumber,
} from "../client-functions";
import {
  defaultBlurredImageBase64,
  defaultImage,
  getImageSrc,
  getLinks,
  MediaTypes,
  Pages,
} from "../functions";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/components/Pagination";

export default function PortfolioClientComponent({
  projects,
}: {
  projects: StrapiResource<Project>[];
}) {
  const portfolioLink = getLinks()[Pages.PORTFOLIO]?.href ?? "";
  const currentPage = useGetPageNumber(MediaTypes.PROJECT);
  const selectedProjects = useGetItemsBasedOnPageNumber(currentPage, projects);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-12 md:gap-y-24 mt-8">
        {selectedProjects.map((project, index) => {
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
      </div>

      <div className="md:mt-8">
        <Pagination
          numberOfItems={projects.length}
          currentPage={currentPage}
          mediaType={MediaTypes.PROJECT}
          urlHash="portfolio"
        />
      </div>
    </div>
  );
}
