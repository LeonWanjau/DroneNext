import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Project = {
  id?: string | number;
  name: string;
  description?: string;
  client?: string;
  date?: string;
  mainBackground: string | StaticImport;
  mainBackgroundVideo?: string | StaticImport;
  images?: string[];
  videos?: string[];
  // blurDataUrl?: string;
};

type Video = {
  src: string;
  thumbnail?: string;
  embedUrl?: string;
};

type Image = {
  src: string;
};
