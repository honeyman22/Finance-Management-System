import { ShareDetails } from "../../../dtos/shares.dto";
const ShareSumary = ({ share }: { share: ShareDetails }) => {
  return (
    <section className="bg-white rounded-xl shadow-md w-full">
      <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4  pt-4">
        Share Summary
      </h3>
      <div className="mt-5 border-t border-gray-200 ">
        <dl className="divide-y divide-gray-200">
          {[
            ["Share Name", share.shareName],
            ["Created Date", share.createdAt.split("T")[0]],
            ["Total Purchased Quantity", `${share.purchaseQuantity} `],
            ["Total Sold Quantity", `${share.sellQuantity}`],
            ["Remaining Quantity", share.remainingQuantity],
            [share?.profit > 0 ? "Profit" : "Loss", `${share.profit ?? "-"}`],
          ].map(([title, value], idx) => (
            <div
              className="py-3 px-3 flex justify-between text-sm"
              key={idx + 4}
            >
              <dt className="text-gray-500">{title}</dt>
              <dd
                className={`text-gray-900 text-right ${
                  title === "Monthly Installment" ? "font-medium" : ""
                }`}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default ShareSumary;
