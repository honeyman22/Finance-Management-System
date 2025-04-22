import { Share } from "../../types";const ShareRow = ({ share }: { share: Share }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
        {share.shareName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        {share.quantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        {share?.unitPrice}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        <span
          className={`px-2 inline-flex text-xs leading-5 ${
            share.transactionType === "Sell"
              ? " bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
              : " bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200"
          } font-semibold rounded-full`}
        >
          {share.transactionType}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold ${
            share.status === "profit"
              ? " bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : " bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          } rounded-full`}
        >
          {share.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        <button className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-3">
          View Reciept
        </button>
      </td>
    </tr>
  );
};

export default ShareRow;
