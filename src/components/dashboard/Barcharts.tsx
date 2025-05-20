import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { api } from "../../api/api-client";
import { DashBoardAnalysisResponseBody } from "../../dtos/dashboard.dto";
const Barcharts = () => {
  const { data: analysisdata } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await api.get<DashBoardAnalysisResponseBody>(
        "dashboard/analysis"
      );
      return response;
    },
  });
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
            data={analysisdata?.data?.data}
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
              dataKey="thisMonth"
              name="Current"
              fill="#22c55e"
            />
            <Bar
              barSize={20}
              dataKey="lastMonth"
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
