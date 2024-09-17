import { doFetch } from "@/app/api";
import ServicesClientComponent from "./ServicesClientComponent";
import { Service, StrapiResponse } from "@/types";

export default async function Services() {
  const res = await doFetch({
    url: "/services?populate[serviceDetails][fields][0]=name&sort=id:desc",
    options: { method: "GET" },
  });
  const services = (await res.json()) as StrapiResponse<Service>;

  return <ServicesClientComponent services={services} />;
}
