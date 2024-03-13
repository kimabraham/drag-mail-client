import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { projectInfo } from "../utils/atoms";
import { useSetRecoilState } from "recoil";

const useGetProject = () => {
  const { id } = useParams();
  const setProjectInfo = useSetRecoilState(projectInfo);

  const { data, isLoading } = useQuery({
    queryKey: ["get-project", id],
    queryFn: async () => {
      const res = await axios.get(`/api/projects/${id}`);
      return res.data.project;
    },
    onQueryStarted: () => {
      setProjectInfo(null);
    },
  });

  useEffect(() => {
    if (data) {
      setProjectInfo(data);
    }
  }, [data, setProjectInfo]);

  return { data, isLoading };
};

export default useGetProject;
