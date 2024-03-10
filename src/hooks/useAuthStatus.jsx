import { useRecoilState } from "recoil";
import { userInfo } from "../utils/atoms";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/shared/Loading";
import axios from "axios";

// API 호출을 위한 URL 정의
const url = "http://localhost:3000/api/auth/success";

const useAuthStatus = () => {
  const [, setUser] = useRecoilState(userInfo);

  const { isLoading } = useQuery({
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
        return userInfo;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });

  if (isLoading) {
    return <Loading />;
  }
};

export default useAuthStatus;
