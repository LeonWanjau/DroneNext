import { Lightbulb } from "lucide-react";
import Link from "next/link";

export default function Logo({
  onDark = true,
  size = "normal",
}: {
  onDark?: boolean;
  size?: "small" | "normal" | "large";
}) {
  const textColor = onDark ? "text-primary-foreground" : "text-primary";
  let iconSize: string;
  let fontSize: string;
  switch (size) {
    case "small":
      iconSize = "size-[16px] md:size-[28px]";
      fontSize = "text-base md:text-2xl";
      break;
    case "normal":
      iconSize = "size-[28px] md:size-[36px]";
      fontSize = "text-lg md:text-3xl";
      break;
    case "large":
      iconSize = "size-[28px] md:size-[36px]";
      fontSize = "text-xl md:text-4xl";
      break;
  }
  return (
    <Link href="/">
      <div className="flex gap-1 items-center">
        <p className={`${fontSize} font-bold`}>Company</p>
        <Lightbulb className={`${iconSize}`} />
      </div>
    </Link>
  );
}
