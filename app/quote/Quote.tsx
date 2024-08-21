"use client";

import DatePicker from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Delete } from "lucide-react";
import { useRef } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { sendMail } from "../client-functions";

interface IFormInputs {
  email: string;
  firstName: string;
  lastName?: string;
  date?: Date;
  additionalInfo?: string;
  primaryDroneUse?: string;
}

export default function Quote({
  inQuotePage = true,
  droneUses = [],
}: {
  inQuotePage?: boolean;
  droneUses?: string[];
}) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<IFormInputs>({});

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const body = `
Email Address: ${data.email}

First Name: ${data.firstName}${data.lastName && `| Last Name: ${data.lastName}`}

Date of Engagement: ${data.date ? data.date?.toDateString() : ""}

Additional Information: ${data.additionalInfo}

Primary Drone Use: ${data.primaryDroneUse ? data.primaryDroneUse : ""}`;
    const subject = "Request For Quotation";
    // sendMail(subject, body);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Your Email Address *</Label>
        <Input
          id="email"
          placeholder=""
          {...register("email", {
            required: "Please enter you email address",
            validate: (value) => {
              return /\w+@\w+\.\w+/gm.test(value)
                ? true
                : "Please enter a valid email address";
            },
          })}
        />
        {errors.email?.message && (
          <p className="text-sm text-error">{errors.email?.message}</p>
        )}
      </div>
      <div className="flex flex-col items-start md:flex-row gap-8 md:gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            placeholder=""
            {...register("firstName", {
              required: "Please enter your first name",
            })}
          />
          {errors.firstName?.message && (
            <p className="text-sm text-error">{errors.firstName?.message}</p>
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="" {...register("lastName")} />
        </div>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="date">Date</Label>
        {/* <Input id="date" type="date" placeholder="" /> */}
        {/* <Controller 
          name="date"
          control={control}
          render={({field}) => <DatePicker {...field}/>}
        /> */}
        <DatePicker
          // inputProps={{ label: "date", register: register, required: false }}
          controlProps={{
            name: "date",
            control,
          }}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="additionalInfo">Additional Information</Label>
        <Textarea
          id="additionalInfo"
          placeholder=""
          {...register("additionalInfo")}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="primaryDroneUse">Primary Drone Use</Label>
        <Controller
          name="primaryDroneUse"
          control={control}
          render={({ field }) => (
            <Select
              key={field.value}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <SelectTrigger className="">
                <div className="grow flex justify-between items-center pr-2">
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {droneUses.map((droneUse) => (
                  <SelectItem value={droneUse}>{droneUse}</SelectItem>
                ))}
                <SelectSeparator />
                {field.value && (
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      className=""
                      onClick={(event) => {
                        event.stopPropagation();
                        field.onChange(undefined);
                      }}
                    >
                      <span>Clear</span>
                      <Delete className="ml-2" />
                    </Button>
                  </div>
                )}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <Button
        type="submit"
        className={`${
          inQuotePage ? "self-stretch md:self-center" : "self-stretch"
        }`}
      >
        Submit
      </Button>
    </form>
  );
}
