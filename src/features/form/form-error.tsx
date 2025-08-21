import React from "react";
import { MdError } from "react-icons/md";

export default function FormError({error}: {error:string}) {
  return (
    <p className="text-red-700 text-xs flex items-center gap-1 mt-1">
      <MdError size={12} />
      {error}
    </p>
  );
}
