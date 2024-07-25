import { getContactItems } from "@/app/functions";
import { LucideIcon, Mail, Phone } from "lucide-react";

export const contactItems: {
  icon: LucideIcon;
  title: string;
  text: string;
  color: string;
}[] = [
  { icon: Phone, title: "Phone", text: "0739284928", color: "primary" },
  { icon: Mail, title: "Email", text: "drone@mail.com", color: "secondary" },
];

export default async function Contacts() {
  const contactItems = await getContactItems();
  return (
    <div>
      <p className="font-bold text-3xl md:text-4xl text-center lg:text-start">
        Our Contacts
      </p>
      <div className="flex">
        <div className="flex flex-col grow md:basis-2/3 md:grow-0 md:flex-row mt-4 md:mt-6 rounded overflow-hidden ring">
          {contactItems.map((item) => (
            <div
              key={item.title}
              className={`grow-0 basis-1/2 p-7 md:p-20 flex flex-col items-center md:items-start gap-6 md:gap-10 bg-${item.color}`}
            >
              <p className={`font-bold text-2xl text-${item.color}-foreground`}>
                {item.title}
              </p>
              <item.icon
                size="48px"
                className={`text-${item.color}-foreground`}
              />
              <p className={`text-${item.color}-foreground`}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
