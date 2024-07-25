import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Appbar from "@/components/Appbar";
import ShowFooter from "@/components/footer/ShowFooter";
import Logo from "@/components/Logo";
// import BgImg from "@/assets/images/wallpaper.webp";
// import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        {/* <Image
          src={BgImg}
          alt="background image"
          className="fixed w-screen h-screen z-0"
        /> */}
        <div className="relative min-h-[100vh] flex flex-col">
          <Appbar logo={<Logo size="small" />} />
          {/* Flex grow to take up extra height remove empty space under footer, when content height is small */}
          <div className="grow">{children}</div>
          <ShowFooter logo={<Logo />} />
          {/* {modal} */}
        </div>
      </body>
    </html>
  );
}
