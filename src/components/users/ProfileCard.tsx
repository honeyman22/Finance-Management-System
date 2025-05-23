import { Skeleton } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsCameraFill } from "react-icons/bs";
import { api } from "../../api/api-client";
import { toast } from "react-toastify";

const ProfileCard = ({
  profile,
  isLoading,
  type,
}: {
  profile: any;
  isLoading: boolean;
  type?: string;
}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["update-profile-picture"],
    mutationFn: (image: File) => {
      const formData = new FormData();
      formData.append("image", image);
      return api.put("/profile", formData);
    },
    onSuccess: () => {
      toast.success("Profile picture updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
  return (
    <div className="w-full flex flex-col  p-6 rounded-md md:items-start items-center gap-5 bg-white">
      {isLoading ? (
        <Skeleton height={80} width={80} radius="full" />
      ) : (
        <div className="image-section h-20 w-20  relative">
          <img
            src={profile?.image ?? "/loan.jpg"}
            alt="profile"
            className="w-20 h-20  object-cover object-top rounded-[80px]"
          />
          {type === "admin" ? (
            <></>
          ) : (
            <>
              {" "}
              <label htmlFor="profile-image">
                <BsCameraFill
                  size={20}
                  className="absolute cursor-pointer bottom-0 right-2 "
                />
              </label>
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    mutate(e.target.files[0]);
                  }
                }}
                id="profile-image"
                hidden
              />
            </>
          )}
        </div>
      )}
      <div className="information-section text-sm text-gray-600 w-full flex gap-4 items-start">
        <div className="flex flex-col  font-medium gap-1.5">
          <p className="">Full Name</p>
          <p className="">Email</p>
          <p className="whitespace-nowrap">Phone Number</p>
          <p className="whitespace-nowrap">Activation Date</p>
          {type !== "admin" && (
            <>
              <p className="whitespace-nowrap">Total Deposit</p>
              <p className="whitespace-nowrap">Total Loan</p>
              <p className="whitespace-nowrap">Active Loan</p>
            </>
          )}
        </div>
        <div className="flex flex-col  font-medium gap-1.5">
          <p className="">:</p>
          <p className="">:</p>
          <p className="">:</p>
          <p className="">:</p>
          {type !== "admin" && (
            <>
              <p className="">:</p>
              <p className="">:</p>
              <p className="">:</p>
            </>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          {isLoading ? (
            Array(7)
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  key={index + 6}
                  width={100}
                  animate={false}
                  height={20}
                />
              ))
          ) : (
            <>
              <p className="">{profile?.fullName}</p>
              <p className="">{profile?.email}</p>
              <p className="">{profile?.phoneNumber}</p>
              <p className="">{profile?.activationDate.split("T")[0]}</p>
              {type !== "admin" && (
                <>
                  <p className="">{profile?.totalDeposit}</p>
                  <p className="">{profile?.totalLoan}</p>
                  <p className="">{profile?.activeLoan}</p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
