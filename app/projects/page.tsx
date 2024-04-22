import { Project } from "@/types";
import Image from "next/image";
import { getImageSrc } from "../functions";
import AppBarSpacer from "@/components/AppbarSpacer";
import Title from "@/components/Title";
import Link from "next/link";

const gridColumns = [
  "md:col-start-1 md:col-end-3",
  "md:col-start-2 md:col-end-4",
];

const namePositions = [
  "right-0 bottom-0 translate-x-1/2 translate-y-1/2",
  "left-0 bottom-0 -translate-x-1/2 translate-y-1/2",
];

function getProjectPositions(index: number) {
  return `${gridColumns[index % 2]} ${namePositions[index % 2]}`;
}

export default function Page() {
  const projects: Project[] = [
    {
      id: 1,
      name: "Project 1 Project 1 Project 1 Project 1 Project 1 Project 1 Project 1",
      mainBackground:
        "https://drive.google.com/file/d/1iyHM0a2OEyHhNPSPHdxUSf3SyXSGLCkO/view?usp=drive_link",
    },
    {
      id: 2,
      name: "Project 2",
      mainBackground:
        "https://drive.google.com/file/d/1iyHM0a2OEyHhNPSPHdxUSf3SyXSGLCkO/view?usp=drive_link",
    },
  ];

  return (
    <>
      <AppBarSpacer />
      <div className="container px-4 mt-8">
        <Title>Projects</Title>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-24 mt-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`relative h-[200px] row-span-1 transition-transform hover:scale-105 cursor-pointer ${
                gridColumns[index % 2]
              }`}
            >
              <Link href={`/projects/${project?.id}`}>
                <Image
                  src={getImageSrc(project.mainBackground as string)}
                  alt="project-image"
                  className="rounded object-cover shadow-md"
                  fill
                />
                <div
                  className={`absolute bg-secondary/60 backdrop-blur text-secondary-foreground border-2 shadow-md rounded p-2 ${
                    namePositions[index % 2]
                  }`}
                >
                  <div className="line-clamp-2 max-w-md">{project.name}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
