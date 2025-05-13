import { Pagination, Skeleton } from "@mantine/core";import ShareRow from "./ShareRow";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/api-client";
import React from "react";
import { ShareListResponseBody } from "../../types/share.dtos";
import ShareTableHeader from "./ShareTableHeader";
const ShareTable = () => {
  const [page, setPage] = React.useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["shares-list", page],
    queryFn: () =>
      api.get<ShareListResponseBody>("shares", {
        params: { page: page, limit: 10 },
      }),
  });

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
      {isLoading || isError ? (
        <>
          <table className="min-w-full divide-y divide-gray-200">
            <ShareTableHeader />
          </table>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index + 6}
                className="m-0.5"
                animate={false}
                height={64}
              />
            ))}
        </>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <ShareTableHeader />
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.data?.data?.map((share) => (
              <ShareRow key={share.id} share={share} />
            ))}
          </tbody>
        </table>
      )}
      <div className="border-t border-gray-200 overflow-x-auto">{}</div>
      {(data?.data?.pagination?.page?.totalPages ?? 0) > 1 && (
        <div className="p-4 flex border-t justify-end">
          <Pagination
            total={data?.data?.pagination?.page?.totalPages ?? 0}
            gap={0}
            value={page}
            onChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default ShareTable;
