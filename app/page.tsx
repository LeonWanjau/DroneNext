import Banner from "@/components/Banner";
import Contacts from "@/components/Contacts";
import Mission from "@/components/Mission";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/services/Services";

export default function Page() {
  return (
    <div className="">
      <div className="relative" style={{ width: "100%" }}>
        <Banner />
      </div>
      <div className="mt-[5rem] md:mt-[10rem]" />
      <div>
        <Mission />
      </div>
      <div className="container px-4 mt-8 md:mt-24">
        <Services />
      </div>
      <div className="container px-4 mt-8 md:mt-24">
        <Portfolio />
      </div>
      <div className="container px-4 mt-8 md:mt-24">
        <Contacts />
      </div>
    </div>
  );
}
