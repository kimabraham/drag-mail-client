import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const useNode = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const updateNode = useMutation({
    mutationFn: (data) =>
      axios.put(`/api/nodes/${data.id}`, { data }, { withCredentials: true }),
    onSuccess: () => {
      // queryClient.invalidateQueries(["get-project", id]);
    },
  });

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

  return { updateNode, removeBlock };
};

export default useNode;
