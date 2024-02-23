import Banner from "@/components/Banner";
import Mission from "@/components/Mission";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";

export default function Page() {
  return (
    <div className="pb-[100px]">
      <div className="relative" style={{ width: "100%" }}>
        <Banner />
      </div>
      <div className="mt-[5rem] md:mt-[10rem]" />
      <div>
        <Mission />
      </div>
      <div className="container px-4 mt-8 md:mt-16">
        <Services />
      </div>
      <div className="container px-4 mt-8 md:mt-16">
        <Portfolio />
      </div>
    </div>
  );
}
