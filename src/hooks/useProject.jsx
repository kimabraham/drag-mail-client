import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";

import { projectInfo } from "../utils/atoms";

const useProject = () => {
  const { id } = useParams();
  const setProjectInfo = useSetRecoilState(projectInfo);

  const { data: project, isLoading } = useQuery({
    queryKey: ["get-project", id],
    queryFn: async () => {
      const res = await axios.get(`/api/projects/${id}`);
      return res.data.project;
    },
    onQueryStarted: () => {
      setProjectInfo(null);
    },
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });

  const updateProject = useMutation({
    mutationFn: ({ projectId, project }) =>
      axios.put(
        `/api/projects/${projectId}`,
        { project },
        { withCredentials: true }
      ),
    onSuccess: () => {},
  });

  const patchProject = useMutation({
    mutationFn: ({ projectId, nodeObject, rowIndex, colIndex, type }) =>
      axios.patch(
        `/api/projects/${projectId}`,
        { projectId, nodeObject, rowIndex, colIndex, type },
        { withCredentials: true }
      ),
    onSuccess: (data) => {
      console.log(data);
      // queryClient.setQueryData(["get-project", id], (prev) => {
      //   return [...prev, result.data.contact];
      // });
    },
  });

  return { project, isLoading, updateProject, patchProject };
};

export default useProject;
