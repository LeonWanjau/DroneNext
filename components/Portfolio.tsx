import { Project } from "@/types";
import DefaultProjectImage from "@/assets/images/aerial-3.jpg";
import Image from "next/image";
import { LoremIpsum } from "lorem-ipsum";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Button } from "./ui/button";
import { ChevronRightIcon } from "lucide-react";
import { projects } from "@/app/projects";

export default function Portfolio() {
  return (
    <div>
      <div className="flex gap-4 md:gap-8 items-center flex-col md:flex-row">
        <p className="font-bold text-3xl md:text-4xl text-center lg:text-start">
          Our Portfolio
        </p>
        <Button>
          View All Projects
          <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="mt-4 md:mt-6 flex flex-col gap-8 md:gap-24">
        {projects.map((project) => (
          <div
            key={project.name}
            className="relative rounded overflow-hidden h-44 md:h-96"
          >
            <div className="absolute -z-10 h-full w-full">
              <Image
                src={project?.mainBackgroundVideo ?? ""}
                alt="project background"
                className="h-full w-full object-cover block"
                placeholder="blur"
                blurDataURL={project?.blurDataUrl ?? "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkyP5fDwADyAHra06GqQAAAABJRU5ErkJggg=="}
              />
            </div>
            <Button
              variant="secondary"
              className="absolute right-4 bottom-4 ring-1"
            >
              View
              <ChevronRightIcon className="ml-2 h-4 w-4" />
            </Button>
            <div className="md:w-1/2 lg:w-1/4 md:h-full bg-secondary/70 flex flex-col items-start md:gap-4 p-2 md:p-4">
              <p className="font-bold md:text-lg">{project.name}</p>
              <p className="md:line-clamp-4 collapse md:visible overflow-hidden">
                {project.description}
              </p>
              <p className="hidden md:block">Client: {project.client}</p>
              <p className="hidden md:block">Date: {project.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
