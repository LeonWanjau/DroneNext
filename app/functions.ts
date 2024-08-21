import DefaultVideoThumbnail from "@/assets/images/aerial-3.jpg";
import { StaticImageData } from "next/image";
import { doFetch } from "./api";
import { SingleStrapiResponse, Contacts, CompanyInfo } from "@/types";
import {
  LucideIcon,
  Phone,
  Mail,
  HomeIcon,
  Folder,
  Contact,
} from "lucide-react";

export const defaultBlurredImageBase64 =
  "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QCQRXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAADEBAgANAAAAZgAAADIBAgAUAAAAdAAAAAAAAABIAAAAAQAAAEgAAAABAAAAR0lNUCAyLjEwLjM2AAAyMDI0OjAzOjA5IDE4OjM1OjI3AP/hDM9odHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDQuNC4wLUV4aXYyIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6R0lNUD0iaHR0cDovL3d3dy5naW1wLm9yZy94bXAvIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9ImdpbXA6ZG9jaWQ6Z2ltcDoyOGE3YjI3ZC01OTdkLTQxODYtOTdkYi1jODA1MjYwYjkwNjIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTU1MWI4MmYtYjE5NC00ZDJhLTg5MDYtNjdiZmQ2MjYwNGJjIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZGFjOTY3ZmItMTkyNS00M2MwLTg1YzMtNWQ3YjMxYWMxZmEwIiBkYzpGb3JtYXQ9ImltYWdlL2pwZWciIEdJTVA6QVBJPSIyLjAiIEdJTVA6UGxhdGZvcm09IkxpbnV4IiBHSU1QOlRpbWVTdGFtcD0iMTcwOTk5ODUyOTU1NzgxMyIgR0lNUDpWZXJzaW9uPSIyLjEwLjM2IiB4bXA6Q3JlYXRvclRvb2w9IkdJTVAgMi4xMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNDowMzowOVQxODozNToyNyswMzowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjQ6MDM6MDlUMTg6MzU6MjcrMDM6MDAiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6Y2hhbmdlZD0iLyIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowNTFlMThhYy05MTE5LTRiZmQtYTY2Yi04OWY5ZTllOGM2OTIiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoTGludXgpIiBzdEV2dDp3aGVuPSIyMDI0LTAzLTA5VDE4OjM1OjI5KzAzOjAwIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+IMWElDQ19QUk9GSUxFAAEBAAAMSExpbm8CEAAAbW50clJHQiBYWVogB84AAgAJAAYAMQAAYWNzcE1TRlQAAAAASUVDIHNSR0IAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1IUCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARY3By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";

export const defaultVideoThumbnail = DefaultVideoThumbnail;

export const defaultImage: StaticImageData = DefaultVideoThumbnail;

export enum VideoType {
  GOOGLE_DRIVE,
  YOUTUBE,
}

export enum Pages {
  HOME = "HOME",
  PORTFOLIO = "PORTFOLIO",
  CONTACTS = "CONTACTS",
}

export function getLinks(inAppBar: Boolean = true) {
  const links: {
    [page in Pages]?: { label: string; href: string; icon: LucideIcon };
  } = {
    [Pages.HOME]: { label: "Home", href: "/", icon: HomeIcon },
    [Pages.PORTFOLIO]: { label: "Portfolio", href: "/portfolio", icon: Folder },
  };
  if (inAppBar) {
    links[Pages.CONTACTS] = {
      label: "Contacts",
      href: "/contacts",
      icon: Contact,
    };
  }
  return links;
}

// Defined as function returning function to keep details encapsulated within outer function
function getMediaItemGridLayoutFn() {
  const defaultSpans: { colspan: string; rowspan: string }[] = [
    { colspan: "md:col-[span_3]", rowspan: "md:row-[span_1]" },
    { colspan: "md:col-[span_1]", rowspan: "md:row-[span_1]" },
    { colspan: "md:col-[span_1]", rowspan: "md:row-[span_1]" },
    { colspan: "md:col-[span_2]", rowspan: "md:row-[span_1]" },
  ];

  const reverseSpans = [...defaultSpans].reverse();

  const itemsPerRow = 4;

  return (itemIndex: number, numberOfItems: number, reverse = false) => {
    const spans = reverse ? reverseSpans : defaultSpans;
    const spanItem = spans[itemIndex % itemsPerRow];
    const lastRow = Math.floor(numberOfItems / itemsPerRow) + 1;
    const currentRow = Math.floor(itemIndex / itemsPerRow) + 1;
    const isLastRow = currentRow === lastRow;
    const isSecondthItem = itemIndex % itemsPerRow === 2;
    const groupIsFull = currentRow * itemsPerRow <= numberOfItems;
    let rowspan = "";
    if (groupIsFull && isSecondthItem) {
      rowspan = "md:row-[span_2]";
    } else {
      rowspan = isLastRow ? "row-[span_1]" : spanItem.rowspan;
    }
    return `${spanItem.colspan} ${rowspan}`;
  };
}

export const getMediaItemGridLayout = getMediaItemGridLayoutFn();

// const imageIdFromDriveLinkRegex = /d\/(\w+)\/view/;
const imageIdFromDriveLinkRegex = /d\/([a-zA-Z0-9_-]+)\/view/;
// [a-zA-Z0-9_-]
export function getIdFromGDriveLink(link: string) {
  const id = link.match(imageIdFromDriveLinkRegex)?.[1];
  return id;
}

export function getImageSrc(src: string) {
  const imageIdFromDriveLink = getIdFromGDriveLink(src);
  const imageSrc = imageIdFromDriveLink
    ? //? `https://drive.google.com/thumbnail?id=${imageIdFromDriveLink}&sz=w1000`
      `https://bu3e7wrsossdiwwjm65zqlkwle0mmfid.lambda-url.eu-west-3.on.aws?imageId=${imageIdFromDriveLink}`
    : src;
  return imageSrc;
}

export function getEmbedUrlFromLink(link: string) {
  const id = getIdFromGDriveLink(link);
  return `https://drive.google.com/file/d/${id ?? ""}/preview`;
}

// Matches video id in url like this:
// https://www.youtube.com/watch?v=f9j8nhMNYO4&list=PLfoNZDHitwjX-oU5YVAkfuXkALZqempRS
const youtubeVideoIdRegex = /(?<=(?:\?v=))[^&]+/;
export function getVideoIdFromYoutubeLink(link: string) {
  const id = link.match(youtubeVideoIdRegex)?.[0];
  return id;
}

export async function getContactItems() {
  const res = await doFetch({
    url: "/contact",
  });
  const contacts = (await res.json()) as SingleStrapiResponse<Contacts>;
  const contactItems: {
    icon: LucideIcon;
    title: string;
    text: string;
    color: string;
  }[] = [];
  Object.entries(contacts.data.attributes).forEach(([key, value]) => {
    const valueUndefined = !!!value;
    if (valueUndefined) {
      return;
    }
    switch (key) {
      case "phone":
        contactItems.push({
          icon: Phone,
          title: "Phone",
          text: value,
          color: "primary",
        });
        break;
      case "email":
        contactItems.push({
          icon: Mail,
          title: "Email",
          text: value,
          color: "secondary",
        });
        break;
      default:
        break;
    }
  });
  return contactItems;
}

export async function getCompanyInfo() {
  const res = await doFetch({
    url: "/company-info?populate[0]=logo",
  });
  const companyInfoAttrs = (
    (await res.json()) as SingleStrapiResponse<CompanyInfo>
  ).data.attributes;
  return companyInfoAttrs;
}

export function getNumberOfItemsPerPage() {
  return parseInt(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE ?? "10");
}

export enum MediaTypes {
  YOUTUBE = "YOUTUBE",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  PROJECT = "PROJECT",
}

export function getMediaPageNumberParamName(mediaType: MediaTypes) {
  return `${mediaType.toLowerCase()}-page`;
}
