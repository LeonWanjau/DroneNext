import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronRightIcon } from "lucide-react";
import { projects } from "@/app/projects";
import { doFetch } from "@/app/api";
import { Project, StrapiResponse } from "@/types";
import {
  Pages,
  defaultBlurredImageBase64,
  getImageSrc,
  getLinks,
} from "@/app/functions";
import Link from "next/link";

export default async function Portfolio() {
  const res = await doFetch({
    url: "/projects?populate[0]=backgroundImage",
  });
  const projects = (await res.json()) as StrapiResponse<Project>;
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
        {projects.data.map((project) => {
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
                <p className="md:line-clamp-4 collapse md:visible overflow-hidden">
                  {projectAttrs.description}
                </p>
                <p className="hidden md:block">
                  Client: {projectAttrs?.client ?? ""}
                </p>
                <p className="hidden md:block">
                  Date: {projectAttrs?.date ?? ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
