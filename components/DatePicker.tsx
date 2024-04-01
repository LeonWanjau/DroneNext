"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Delete } from "lucide-react";
import {
  FieldValues,
  Path,
  UseControllerProps,
  UseFormRegister,
  useController,
} from "react-hook-form";

type InputProps<T extends FieldValues> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
};

export default function DatePicker<T extends FieldValues>({
  controlProps,
}: {
  controlProps: UseControllerProps<T>;
}) {
  const [date, setDate] = React.useState<Date>();
  const [popoverOpen, setpopoverOpen] = React.useState(false);
  const { field } = useController(controlProps);

  return (
    <Popover modal open={popoverOpen} onOpenChange={setpopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-between text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <div className="flex justify-start">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </div>
          {date && (
            <Button
              variant="ghost"
              size="icon"
              className="w-auto"
              onClick={(event) => {
                event.stopPropagation();
                setDate(undefined);
                field.onChange(undefined);
              }}
            >
              <Delete className="opacity-50" />
            </Button>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date);
            field.onChange(date);
            setpopoverOpen((prevState) => !prevState);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
