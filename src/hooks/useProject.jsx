import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { PATCH_PROJECT_TYPES } from "../constants/constants";
import { insertIntoNodeObject } from "../utils/nodeUtils";
import { useRecoilValue } from "recoil";
import { isDemo } from "../utils/atoms";

const useProject = () => {
  const { id } = useParams();
  const demo = useRecoilValue(isDemo);
  const queryClient = useQueryClient();

  const { data: project, isLoading } = useQuery({
    queryKey: ["get-project", id],
    queryFn: async () => {
      if (!demo) {
        if (localStorage.getItem("project")) {
          const local = JSON.parse(localStorage.getItem("project"));
          await axios.put(
            `/api/projects/${id}`,
            { project: local },
            { withCredentials: true }
          );
          localStorage.clear();
        }
        const res = await axios.get(`/api/projects/${id}`, {
          withCredentials: true,
        });
        return res.data.project;
      }
    },
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000,
  });

  const updateProject = useMutation({
    mutationFn: ({ projectId, project }) =>
      axios.put(
        `/api/projects/${projectId}`,
        { project },
        { withCredentials: true }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["get-project", id]);
      queryClient.setQueryData(["get-project", id], data.project);
    },
  });

  const patchProject = useMutation({
    mutationFn: ({ projectId, nodeObject, rowIndex, colIndex, type }) =>
      axios.patch(
        `/api/projects/${projectId}`,
        { projectId, nodeObject, rowIndex, colIndex, type },
        { withCredentials: true }
      ),
    onSuccess: (res, variables) => {
      const { type, rowIndex, colIndex, nodeObject } = variables;
      queryClient.invalidateQueries(["get-project", id]);
      queryClient.setQueryData(["get-project", id], (prev) => {
        switch (type) {
          case PATCH_PROJECT_TYPES.ADD_ROW: {
            const updatedComponents = [...prev.component];
            updatedComponents.splice(rowIndex, 0, nodeObject);
            return {
              ...prev,
              component: updatedComponents,
            };
          }
          case PATCH_PROJECT_TYPES.REMOVE_ROW: {
            return {
              ...prev,
              component: prev.component.filter(
                (row) => row.id !== nodeObject.id
              ),
            };
          }
          case PATCH_PROJECT_TYPES.ADD_BLOCK: {
            const updatedComponent = JSON.parse(JSON.stringify(prev.component));
            const targetRow = updatedComponent[rowIndex];
            insertIntoNodeObject(
              targetRow,
              "content-row",
              colIndex,
              nodeObject
            );
            return {
              ...prev,
              component: updatedComponent,
            };
          }
          default:
            break;
        }
      });
    },
  });

  return { project, isLoading, updateProject, patchProject };
};

export default useProject;
