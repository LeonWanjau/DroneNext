import { StaticImport } from "next/dist/shared/lib/get-img-props";

type StrapiMeta = {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

type StrapiResponse<T> = {
  data: StrapiResource<T>[];
  meta?: StrapiMeta;
};

type SingleStrapiResponse<T> = {
  data: StrapiResource<T>;
  meta?: StrapiMeta;
};

type StrapiResource<T> = {
  id: number;
  attributes: {
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  } & T;
};

type BannerItem = {
  bannerText: string;
  image?: string;
};

type PhilosophyAndMission = {
  title: string;
  description: string | null;
  backgroundImage: string | null;
};

type Service = {
  name: string;
  imageLink?: string | null;
  serviceDetails: StrapiResponse<{ name: string }>;
};

type Contacts = {
  phone: string;
  email: string;
};

type CompanyInfo = {
  companyName: string;
  logo: SingleStrapiResponse<Image>;
  description: string | null;
};

type Project = {
  title: string;
  description?: string | null;
  client?: string | null;
  date?: string | null;
  backgroundImage?: SingleStrapiResponse<Image>;
  images?: StrapiResponse<Image>;
  videos?: StrapiResponse<Video>;
  youtubeVideos?: StrapiResponse<YoutubeVideo>;
};

type Video = {
  name?: string | null;
  link?: string | null;
  embedUrl?: string | null;
};

type Image = {
  name?: string | null;
  link: string;
};

type YoutubeVideo = {
  name?: string | null;
  link?: string | null;
};
