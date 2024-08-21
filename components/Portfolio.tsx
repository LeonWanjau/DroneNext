import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronRightIcon } from "lucide-react";
import { doFetch } from "@/app/api";
import { FeaturedProjects, SingleStrapiResponse } from "@/types";
import {
  Pages,
  defaultBlurredImageBase64,
  getImageSrc,
  getLinks,
} from "@/app/functions";
import Link from "next/link";

export default async function Portfolio() {
  const res = await doFetch({
    // url: "/projects?populate[0]=backgroundImage",
    url: "/featured-project?populate[projects][populate]=*&populate[projects][sort][0]=id:desc",
  });
  const projects = (
    (await res.json()) as SingleStrapiResponse<FeaturedProjects>
  ).data.attributes.projects;
  const portfolioLink = getLinks()[Pages.PORTFOLIO]?.href ?? "";

  return (
    <div>
      <div className="flex gap-4 md:gap-8 items-center flex-col md:flex-row">
        <p className="font-bold text-3xl md:text-4xl text-center lg:text-start">
          Our Portfolio
        </p>
        <Link href={portfolioLink}>
          <Button>
            View All Projects
            <ChevronRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="mt-4 md:mt-6 flex flex-col gap-8 md:gap-24">
        {projects &&
          projects.data.map((project) => {
            const projectAttrs = project.attributes;
            return (
              <div
                key={project.id}
                className="relative rounded overflow-hidden h-44 md:h-96"
              >
                <div className="absolute -z-10 h-full w-full">
                  <Image
                    src={getImageSrc(
                      projectAttrs.backgroundImage?.data.attributes.link ?? ""
                    )}
                    alt="project background"
                    className="h-full w-full object-cover block"
                    placeholder={defaultBlurredImageBase64}
                    fill
                  />
                </div>
                <Link href={`${portfolioLink}/${project.id}`}>
                  <Button
                    variant="secondary"
                    className="absolute right-4 bottom-4 ring-1"
                  >
                    View
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <div className="md:w-1/2 lg:w-1/4 md:h-full bg-secondary/70 flex flex-col items-start md:gap-4 p-2 md:p-4 backdrop-blur-sm">
                  <p className="font-bold md:text-lg">{projectAttrs.title}</p>
                  {projectAttrs?.description && (
                    <p className="md:line-clamp-4 collapse md:visible overflow-hidden">
                      {projectAttrs.description}
                    </p>
                  )}
                  {projectAttrs?.client && (
                    <p className="hidden md:block">
                      Client: {projectAttrs?.client}
                    </p>
                  )}
                  {projectAttrs?.date && (
                    <p className="hidden md:block">
                      Date: {projectAttrs?.date}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
