import {  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const Barcharts = () => {
  const data = [
    {
      name: "Deposits",
      prev_month: 4000,
      current_month: 2400,
    },
    {
      name: "Loans",
      prev_month: 3000,
      current_month: 1398,
    },
    {
      name: "Interest",
      prev_month: 2000,
      current_month: 9800,
    },
    {
      name: "Fines",
      prev_month: 2780,
      current_month: 3908,
    },
  ];
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
      <div className="px-4 py-5 border-b ">
        <h2 className="text-lg font-medium text-gray-900">
          Financial Overview
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Comparison of previous and current values across key categories
        </p>
      </div>
      <div className="pt-10 w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              barSize={20}
              dataKey="current_month"
              name="Current"
              fill="#22c55e"
            />
            <Bar
              barSize={20}
              dataKey="prev_month"
              name="Previous"
              fill="#a855f7"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Barcharts;
