import { Pagination } from "@mantine/core";
import { shareData } from "../../utils/sharedata";
import ShareRow from "./ShareRow";
const ShareTable = () => {
  return (
    <div className="bg-white shadow overflow-hidden rounded-md mb-8">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Share Management History
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Your recent shares transaction records
          </p>
        </div>
      </div>
      <div className="border-t border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Share Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Purchase Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {shareData.map((share) => (
              <ShareRow key={share.id} share={share} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex border-t justify-end p-4">
        <Pagination total={5} value={2} gap={0} />
      </div>
    </div>
  );
};

export default ShareTable;
