import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Project = {
  name: string;
  description?: string;
  client?: string;
  date?: string;
  mainBackground: string | StaticImport;
  mainBackgroundVideo?: string | StaticImport;
  images?: string[];
  videos?: string[];
  blurDataUrl?: string;
};
