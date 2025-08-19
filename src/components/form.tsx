import { ChangeEvent, useRef } from "react";
import InputField from "@/components/input-field";
import Image from "next/image";
import { useFormik } from "formik";
import { formValidation } from "@/validations/form-validation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export interface IFormState {
  fullName: string;
  amount: string;
  phoneNumber: string;
  profilePicture: File | null;
}

export interface IFormProps {
  submitForm: (formState: IFormState) => void;
}

export default function Form({ submitForm }: IFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      amount: "",
      phoneNumber: "",
      profilePicture: null,
    },
    validationSchema: formValidation,
    onSubmit: (values, { resetForm }) => {
      const records = { ...values, date: new Date() };
      submitForm(records);
      resetForm();
      formik.setFieldValue("profilePicture", null);
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    formik.setFieldValue("profilePicture", file);
  };

  return (
    <form
      className="border border-gray-300 max-w-sm bg-card text-card-foreground flex flex-col rounded-xl p-6 shadow-sm"
      onSubmit={formik.handleSubmit}
    >
      <InputField
        id="fullName"
        label="Full Name"
        type="text"
        value={formik.values.fullName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.fullName && formik.errors.fullName && (
        <div className="text-red-500 text-sm mb-1">{formik.errors.fullName}</div>
      )}
      <InputField
        id="amount"
        label="Amount"
        type="number"
        value={formik.values.amount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.amount && formik.errors.amount && (
        <div className="text-red-500 text-sm mb-1">{formik.errors.amount}</div>
      )}
      <InputField
        id="phoneNumber"
        label="Phone Number"
        type="tel"
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.phoneNumber && formik.errors.phoneNumber && (
        <div className="text-red-500 text-sm mb-1">{formik.errors.phoneNumber}</div>
      )}

      <div>
        <Input
          type="file"
          accept=".png,.jpg,.jpeg"
          hidden
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <div className="flex flex-col items-center justify-between py-4 border-dotted border-3 border-gray-300 rounded-md">
          {formik.values.profilePicture && (
            <Image
              src={URL.createObjectURL(formik.values.profilePicture)}
              alt="Thumbnail"
              className="object-center mb-4 object-cover py-3 rounded"
              height={80}
              width={80}
            />
          )}
          <Button className="py-6" type="button" onClick={() => fileInputRef.current?.click()}>
            Upload Profile Picture
          </Button>
        </div>

        {formik.touched.profilePicture && formik.errors.profilePicture && (
          <div className="text-red-500 text-sm mb-1">{formik.errors.profilePicture}</div>
        )}
      </div>

      <Button
        className="bg-black w-full flex justify-center items-center font-bold text-base ml-auto text-white mt-6 py-5 px-7 cursor-pointer rounded-sm"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}
