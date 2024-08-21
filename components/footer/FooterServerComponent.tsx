import { doFetch } from "@/app/api";
import { Service, StrapiResponse } from "@/types";
import ShowFooter from "./ShowFooter";
import Logo from "../Logo";

export default async function FooterServerComponent() {
  const res = await doFetch({
    url: "/services",
    options: { method: "GET" },
  });
  const services = (await res.json()) as StrapiResponse<Service>;
  const serviceNames = services.data.map((service) => service.attributes.name);

  return <ShowFooter logo={<Logo />} serviceNames={serviceNames} />;
}
