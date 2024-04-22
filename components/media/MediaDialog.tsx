"use client";
import { Dialog, DialogContent } from "../ui/dialog";

export default function MediaDialog({
  children,
  open,
  toggleDialog,
}: {
  children: React.ReactNode;
  open: boolean;
  toggleDialog: (b: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent className="container pt-12">
        <div className="rounded-lg overflow-hidden">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
