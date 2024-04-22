"use client";

import Quote from "@/app/quote/Quote";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function InterceptedQuote() {
  const router = useRouter();

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent className="overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>Get a Free Quote</DialogTitle>
        </DialogHeader>
        <Quote inQuotePage={false} />
      </DialogContent>
    </Dialog>
  );
}
