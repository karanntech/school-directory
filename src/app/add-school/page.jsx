"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "@/components/FormInput";

const schema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  contact: yup.number().typeError("Contact must be a number").required(),
  email_id: yup.string().email().required(),
  image: yup
    .mixed()
    .test("fileSize", "File is too large", (value) =>
      value?.[0] ? value[0].size <= 5000000 : true
    )
    .test("fileType", "Unsupported file type", (value) =>
      value?.[0]
        ? ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
        : true
    ),
});

const AddSchool = () => {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "image" && data.image[0]) {
        formData.append(key, data.image[0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      const res = await fetch("/api/add-school", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setSuccess(true);
        reset();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 bg-white rounded shadow-md">
      <div className="flex flex-col md:flex-row gap-8 text-black">
        {/* Left: Form */}
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-6">Add School</h1>
          {success && (
            <p className="text-green-600 mb-4">School added successfully!</p>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="space-y-4"
          >
            <FormInput
              label="School Name"
              name="name"
              placeholder="Enter school name"
              register={register}
              errors={errors}
            />
            <FormInput
              label="Address"
              name="address"
              register={register}
              errors={errors}
            />
            <FormInput
              label="City"
              name="city"
              register={register}
              errors={errors}
            />
            <FormInput
              label="State"
              name="state"
              register={register}
              errors={errors}
            />
            <FormInput
              label="Contact"
              name="contact"
              type="number"
              register={register}
              errors={errors}
            />
            <FormInput
              label="Email"
              name="email_id"
              type="email"
              register={register}
              errors={errors}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="w-full file:cursor-pointer file:px-3 file:py-2 file:border file:border-gray-300 file:rounded-md file:text-sm file:text-gray-700 file:bg-gray-100 file:mr-2  hover:file:bg-gray-200"
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
            >
              Add School
            </button>
          </form>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 items-center justify-center">
          <div
            className="w-full h-full bg-cover bg-center rounded shadow"
            style={{
              backgroundImage:
                "url('https://st2.depositphotos.com/4948655/11775/v/950/depositphotos_117759834-stock-illustration-vertical-background-of-school-supplies.jpg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AddSchool;
