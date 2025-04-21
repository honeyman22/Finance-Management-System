import { ReactNode } from "react";interface DashboardCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  description?: string;
  footerText: string;
  footerAction?: () => void;
  footerLink?: string;
  footerColor?: string;
  bgColor?: string;
  extra?: ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  title,
  value,
  description,
  footerText,
  footerAction,
  bgColor,
  footerLink = "#",
  footerColor = "text-blue-700 hover:text-blue-900",
  extra,
}) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
      <div className="p-5 flex items-center">
        <div
          className={`flex-shrink-0 rounded-md p-3 bg-opacity-80 ${bgColor} text-white`}
        >
          {icon}
        </div>
        <div className="ml-5 w-0 h-14 flex-1">
          <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
          <div className="flex gap-2 items-end">
            {" "}
            <p className="text-2xl font-medium text-gray-900">{value}</p>
            {extra}
          </div>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          {footerAction ? (
            <button
              onClick={footerAction}
              className={`font-medium ${footerColor}`}
            >
              {footerText}
            </button>
          ) : (
            <a href={footerLink} className={`font-medium ${footerColor}`}>
              {footerText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
