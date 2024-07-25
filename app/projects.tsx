import { Project } from "@/types";
import DefaultProjectImage from "@/assets/images/aerial-3.jpg";
import BeachGif from "@/assets/gifs/beach.gif";
import BeachVideo from "@/assets/videos/beach.webp";
import { LoremIpsum } from "lorem-ipsum";
import { defaultBlurredImageBase64 as blurredImageBase64 } from "./functions";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});



export const projects: Project[] = [
  {
    title: "Project 1",
    client: "Client 1",
    date: "DD-MM-YYYY",
    // description: `Client requested aerial drone footage of specified area which was shot
    //   and edited within the requested time frame`,
    description: lorem.generateSentences(4),
    // backgroundImage: BeachGif,
    // mainBackgroundVideo: BeachVideo,
  },
  {
    title: "Project 2",
    client: "Client 2",
    date: "DD-MM-YYYY",
    description: lorem.generateSentences(5),
    // backgroundImage: DefaultProjectImage,
    // mainBackgroundVideo: BeachVideo,
  },
  {
    title: "Project 3",
    client: "Client 3",
    date: "DD-MM-YYYY",
    description: lorem.generateSentences(5),
    // mainBackground: DefaultProjectImage,
    // mainBackgroundVideo: BeachVideo,
  },
];
