import { PendingItemData } from "../../types";import PendingItem from "./PendingItems";

interface Props {
  items: PendingItemData[];
  onView: (id: string) => void;
}

const PendingApprovals: React.FC<Props> = ({ items, onView }) => {
  return (
    <div className="bg-white shadow rounded-md overflow-hidden">
      <div className="px-4 py-5 border-b sm:px-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Pending Approvals
          </h2>
          <p className="text-sm text-gray-500">
            Items requiring your attention
          </p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          {items.length} pending
        </span>
      </div>

      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <PendingItem key={item.id} item={item} onView={onView} />
        ))}

        <li className="text-center hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <button
              onClick={() => console.log("View all pending approvals clicked")}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 bg-transparent border-none cursor-pointer"
            >
              View all pending approvals &rarr;
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default PendingApprovals;
