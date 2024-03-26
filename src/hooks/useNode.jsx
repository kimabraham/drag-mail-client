import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { findNodeById, findNodeByMongoId } from "../utils/nodeUtils";

const useNode = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const updateNode = useMutation({
    mutationFn: (data) =>
      axios.put(`/api/nodes/${data.id}`, { data }, { withCredentials: true }),
    onSuccess: (result) => {
      queryClient.setQueryData(["get-project", id], (prev) => {
        const {
          data: { node },
        } = result;

        const index = prev.component
          .map((row) => findNodeById(row, node.nodeId))
          .findIndex((row) => row?.nodeId);

        const updatedComponent = JSON.parse(JSON.stringify(prev.component));

        const targetRow = updatedComponent[index];
        findNodeByMongoId(targetRow, node);

        return {
          ...prev,
          component: updatedComponent,
        };
      });
    },
  });

  const removeBlock = useMutation({
    mutationFn: (data) =>
      axios.delete(
        `/api/nodes/${data.id}`,
        { data },
        { withCredentials: true }
      ),
    onSuccess: (result, variables) => {
      queryClient.invalidateQueries(["get-project", id]);
      queryClient.setQueryData(["get-project", id], (prev) => {
        const { id } = result;
        const { nodeId } = variables;

        const index = prev.component
          .map((row) => findNodeById(row, nodeId))
          .findIndex((row) => row?.nodeId);

        const updatedComponent = JSON.parse(JSON.stringify(prev.component));
        const targetRow = updatedComponent[index];

        insertDefaultTableInNode(targetRow, id);

        return {
          ...prev,
          component: updatedComponent,
        };
      });
    },
  });

  return {
    updateNode,
    removeBlock,
  };
};

export default useNode;
