import { Project } from "@/types";
import DefaultProjectImage from "@/assets/images/aerial-3.jpg";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const projects: Project[] = [
  {
    name: "Project 1",
    client: "Client 1",
    date: "DD-MM-YYYY",
    description: `Client requested aerial drone footage of specified area which was shot
      and edited within the requested time frame`,
    mainBackground: DefaultProjectImage,
  },
];

export default function Portfolio() {
  return (
    <div>
      <p className="font-bold text-3xl md:text-4xl text-center lg:text-start">
        Our Portfolio
      </p>
      <div>
        {projects.map((project) => (
          <div key={project.name} className="relative rounded overflow-hidden">
            <div className="absolute -z-10 h-full w-full">
              <Image
                src={project.mainBackground}
                alt="project background"
                className="h-full w-full object-cover block"
              />
            </div>
            <div>
              <p>{project.name}</p>
              <div className="flex justify-between">
                <p>{project.client}</p>
                <p>{project.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
