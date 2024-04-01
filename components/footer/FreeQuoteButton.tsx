"use client";

import { sendMail } from "@/app/client-functions";
import { Button } from "@/components/ui/button";

export default function FreeQuoteButton() {
  return (
    <Button
      className="uppercase md:py-6 md:px-10"
      onClick={() => {
        sendMail("Subject", "Body");
      }}
    >
      Get a free qoute
    </Button>
  );
}
