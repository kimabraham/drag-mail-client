import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { debounce } from "lodash";
import { useParams } from "react-router-dom";

const useNode = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const updateNode = useMutation({
    mutationFn: (data) =>
      axios.put(`/api/nodes/${data.id}`, { data }, { withCredentials: true }),
    onSuccess: () => {
      queryClient.invalidateQueries(["get-project", id]);
    },
  });

  const debouncedUpdateNode = debounce((data) => {
    updateNode.mutate(data);
  }, 500);

  const removeBlock = useMutation({
    mutationFn: (data) =>
      axios.delete(
        `/api/nodes/${data.id}`,
        { data },
        { withCredentials: true }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["get-project", id]);
    },
  });

  return {
    updateNode: { ...updateNode, mutate: debouncedUpdateNode },
    removeBlock,
  };
};

export default useNode;
