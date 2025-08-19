import { ChangeEvent, FocusEvent } from "react";
import { HTMLInputTypeAttribute } from "react";

interface IInputField {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  value?: string;
  accept?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent) => void;
}

export default function InputField({ id, label, type, value, accept, onChange, onBlur }: IInputField) {
  return (
    <div className="flex flex-col my-2">
      <label htmlFor={id} className="mb-2 font-semibold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={id}
        {...(type !== "file" ? { value } : {})}
        accept={accept}
        className="border border-gray-300 rounded-sm px-2 py-1"
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}
