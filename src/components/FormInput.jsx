import React from "react";

const FormInput = ({
  label,
  name,
  type = "text",
  register,
  required,
  errors,
  placeholder,
}) => {
  const hasError = errors[name];
  return (
    <div className="mb-4 w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder || `Enter ${label}`}
        {...register(name, { required })}
        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          hasError ? "border-red-500" : "border-gray-300"
        }`}
      />
      {hasError && (
        <p className="text-red-500 text-sm mt-1">
          {hasError.message || `${label} is required`}
        </p>
      )}
    </div>
  );
};

export default FormInput;
