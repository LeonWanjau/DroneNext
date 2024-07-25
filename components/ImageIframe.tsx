import { getEmbedUrlFromLink } from "@/app/functions";

export default function ImageIframe({ src }: { src: string | undefined }) {
  const embedUrl = src ? getEmbedUrlFromLink(src) : "";

  return (
    <iframe
      src={embedUrl}
      allow="autoplay"
      className="absolute w-full h-full"
      width="1920px"
      height="1080px"
    ></iframe>
  );
}
