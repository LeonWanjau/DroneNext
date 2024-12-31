"use server";

import { SingleStrapiResponse, Contacts, CompanyInfo } from "@/types";
import { LucideIcon, Phone, Mail } from "lucide-react";
import { doFetch } from "./api";

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
