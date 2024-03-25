import { useRecoilState, useSetRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { isDemo, userInfo } from "../utils/atoms";

const url = "/api/auth/success";

const useAuthStatus = () => {
  const [, setUser] = useRecoilState(userInfo);
  const setIsDemo = useSetRecoilState(isDemo);

  const { data, isLoading } = useQuery({
    queryKey: ["get-auth-status"],
    queryFn: async () => {
      try {
        const response = await axios.get(url, { withCredentials: true });
        const { _id, name, email, avatarUrl } = response.data.user;
        const userInfo = {
          _id,
          name,
          email,
          avatarUrl,
        };
        setUser(userInfo);
        setIsDemo(false);
        return userInfo;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });

  return { user: data, isLoading };
};

export default useAuthStatus;
