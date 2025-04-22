const CustomTextArea = ({
  register,
  id,
  label,
  rows,
  errors,
}: {
  register: any;
  id: string;
  label: string;
  rows: number;
  errors?: any;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={id}
        {...register(id)}
        autoComplete="none"
        className="appearance-none resize-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        rows={rows}
      />
      {errors[id] && (
        <p className=" font-medium text-red-500  text-xs ">
          {errors[id].message}
        </p>
      )}
    </div>
  );
};

export default CustomTextArea;
