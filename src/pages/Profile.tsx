import { ProfileResponseBody } from "../dtos/users.dto";
import { api } from "../api/api-client";
import { useQuery } from "@tanstack/react-query";

import ProfileCard from "../components/users/ProfileCard";

const Profile = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.get<ProfileResponseBody>("/profile"),
  });

  return <ProfileCard profile={profile?.data?.data} isLoading={isLoading} />;
};

export default Profile;
