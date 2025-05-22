import { BsCameraFill } from "react-icons/bs";
import { ProfileResponseBody } from "../dtos/users.dto";
import { api } from "../api/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@mantine/core";
import { toast } from "react-toastify";
const Profile = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.get<ProfileResponseBody>("/profile"),
  });

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
            src={profile?.data?.data?.image ?? "/loan.jpg"}
            alt="profile"
            className="w-20 h-20  object-cover object-top rounded-[80px]"
          />
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
        </div>
      )}
      <div className="information-section text-sm text-gray-600 w-full flex gap-4 items-start">
        <div className="flex flex-col  font-medium gap-1.5">
          <p className="">Full Name</p>
          <p className="">Email</p>
          <p className="whitespace-nowrap">Phone Number</p>
          <p className="whitespace-nowrap">Activation Date</p>
          <p className="whitespace-nowrap">Total Deposit</p>
          <p className="whitespace-nowrap">Total Loan</p>
          <p className="whitespace-nowrap">Active Loan</p>
        </div>
        <div className="flex flex-col  font-medium gap-1.5">
          <p className="">:</p>
          <p className="">:</p>
          <p className="">:</p>
          <p className="">:</p>
          <p className="">:</p>
          <p className="">:</p>
          <p className="">:</p>
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
              <p className="">{profile?.data.data.fullName}</p>
              <p className="">{profile?.data.data.email}</p>
              <p className="">{profile?.data.data.phoneNumber}</p>
              <p className="">
                {profile?.data.data.activationDate.split("T")[0]}
              </p>
              <p className="">{profile?.data.data.totalDeposit}</p>
              <p className="">{profile?.data.data.totalLoan}</p>
              <p className="">{profile?.data.data.activeLoan}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
