import { Project } from "@/types";
import Image from "next/image";

export default function ProjectHomePreview({ project }: { project: Project }) {
  return (
    <div>
      <p>{project.title}</p>
      <div className="flex justify-between">
        <p>{project.client}</p>
        <p>{project.date}</p>
      </div>
      <p>{project.description}</p>
      <Image
        src={project.backgroundImage?.data.attributes.link ?? ""}
        alt="project background"
        className="absolute top-0 left-0 h-full object-cover"
      />
    </div>
  );
}
