import React from "react";
interface CommonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: any;
  register?: any;
  label?: string;
  id: string;

  textsize?: string;
}
const CustomInput = ({
  errors,
  id,
  label,
  register,

  ...others
}: CommonInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={id}
        {...register(id)}
        {...others}
        autoComplete="none"
        required
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
      {errors[`${id}`] && (
        <p className="input-error-text text-bluesh text-semanticnegative text-xs ">
          {errors[`${id}`].message}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
