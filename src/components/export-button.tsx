import React from "react";
import { Button } from "./ui/button";
import { exportToExcel } from "@/utils/exportToExcel";
import { IRecords } from "@/app/page";

interface IExportExcelButton {
  filteredRecords: IRecords[];
}

export default function ExportExcelButton({ filteredRecords }: IExportExcelButton) {
  return (
    <Button className="py-6 px-8 font-bold cursor-pointer w-full lg:max-w-sm" onClick={() => exportToExcel(filteredRecords, "filtered-records")}>
      Export To Excel
    </Button>
  );
}
