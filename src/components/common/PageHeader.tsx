const PageHeader = ({
  subtitle,
  title,
  buttons,
}: {
  subtitle: string;
  title: string;
  buttons?: Array<{
    icon: JSX.Element;
    label: string;
    onClick: () => void;
  }>;
}) => {
  return (
    <div className="flex  flex-col items-center md:flex-row  justify-between w-full ">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>
      <div className="mt-4 md:mt-0  flex space-x-3">
        {buttons?.map((button, index) => (
          <button
            key={button.label}
            type="button"
            onClick={button.onClick}
            className={`inline-flex h-10 items-center   px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              index == 1
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }  `}
          >
            {button.icon}
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PageHeader;
