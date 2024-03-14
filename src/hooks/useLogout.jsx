import axios from "axios";
import { useSetRecoilState } from "recoil";

import { userInfo } from "../utils/atoms";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userInfo);

  const handleLogout = async () => {
    await axios.get("/api/auth/logout", { withCredentials: true });
    setUser(null);
    navigate("/");
  };

  return handleLogout;
};

export default useLogout;
