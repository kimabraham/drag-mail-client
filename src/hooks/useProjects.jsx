import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useProjects = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: projects, isLoading } = useQuery({
    queryKey: ["get-user-projects"],
    queryFn: async () => {
      const res = await axios.get(`/api/users/projects`, {
        withCredentials: true,
      });
      return res.data.projects;
    },
  });

  const createProject = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/projects/", { withCredentials: true });
      return res.data.project;
    },
    onSuccess: (project) => {
      queryClient.setQueryData(["get-user-projects"], (oldProjects) => {
        return [...oldProjects, project];
      });
      navigate(`/template/${project._id}`);
    },
  });

  const deleteProject = useMutation({
    mutationFn: (projectId) =>
      axios.delete(`/api/projects/${projectId}`, { withCredentials: true }),
    onSuccess: (data, variables) => {
      const projectId = variables;
      queryClient.setQueryData(["get-user-projects"], (oldProjects) => {
        return oldProjects.filter((project) => project._id !== projectId);
      });
    },
  });

  return {
    projects,
    isLoading,
    createProject,
    deleteProject,
  };
};

export default useProjects;
