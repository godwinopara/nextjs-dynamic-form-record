"use client";

import { ChangeEvent, useState } from "react";
import Form, { IFormState } from "@/components/form";
import toast from "react-hot-toast";
import { DataTable } from "@/features/record-table/data-table";
import { columns } from "@/features/record-table/columns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface IRecords {
  fullName: string;
  amount: string;
  phoneNumber: string;
  profilePicture: File | null;
  date: string;
}

export default function Home() {
  const [formLength, setFormLength] = useState<number>(0);
  const [records, setRecords] = useState<IRecords[]>([]);

  /* ==== Add New Record To Records ==== */

  const addRecord = (data: IFormState) => {
    const newRecord = [...records, data] as IRecords[];
    setRecords(newRecord);
    toast.success("New Record Added Successfully");
  };

  return (
    <div className="px-10">
      {/* ======  Input  ======== */}
      <h1 className="my-5 text-center font-bold text-2xl underline">Dynamic Form</h1>

      <div className="flex flex-col lg:px-20 py-10 max-w-xl mx-auto w-full">
        <Label className="mb-4 text-lg font-bold">Enter Number of Form</Label>
        <Input
          value={String(formLength)}
          type="number"
          className="border p-5 max-w-5xl"
          inputMode="numeric"
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            setFormLength(Number(e.target.value))
          }
        />
      </div>

      {/* ======= Display Form ======= */}

      <div className="grid gap-6 mb-20 lg:grid-cols-3 lg:px-20">
        {formLength > 0 &&
          Array.from(Array(formLength).keys()).map((_, index) => {
            return <Form key={index} submitForm={addRecord} />;
          })}
      </div>

      {/* ======= Records Table =========*/}
      <div className="max-w-6xl mx-auto">
        <DataTable columns={columns} data={records} />
      </div>
    </div>
  );
}
