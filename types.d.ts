import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Project = {
  name: string;
  description?: string;
  client?: string;
  date?: string;
  mainBackground: string | StaticImport;
  images?: string[];
  videos?: string[];
};
