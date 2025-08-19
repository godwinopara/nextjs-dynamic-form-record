"use client";

import { IRecords } from "@/app/page";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

const normalize = (date: Date) => {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy.getTime();
};

export const columns: ColumnDef<IRecords>[] = [
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "profilePicture",
    header: "Profile Picture",
    cell: ({ row }) => {
      const profilePicture = row.original.profilePicture;
      if (!profilePicture) return null;
      return (
        <Image
          src={URL.createObjectURL(profilePicture)}
          alt="Thumbnail"
          className="object-center object-cover py-3 flex items-center justify-center  rounded"
          height={20}
          width={20}
        />
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date Submitted",
    cell: ({ row }) => {
      const date = row.original.date;
      return date.toLocaleString();
    },
    filterFn: (row, id, value) => {
      const date: Date = row.getValue(id);
      const { from, to } = value || {};
      if (!from || !to) return true;

      const day = normalize(date)
      return day >= normalize(from) && day <= normalize(to);
    },
  },
];
