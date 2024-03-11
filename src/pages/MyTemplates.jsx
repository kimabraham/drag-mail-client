import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { styled } from "styled-components";

import NewTemplateCard from "../components/Template/NewTemplateCard";
import TemplateCard from "../components/Template/TemplateCard";
import Loading from "../components/shared/Loading";

const Container = styled.div`
  width: 80%;
  padding: 150px 0px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  column-gap: 40px;
`;

const MyTemplates = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["get-user-projects"],
    queryFn: async () => {
      const res = await axios.get(`/api/users/projects`, {
        withCredentials: true,
      });
      return res.data.projects;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (projectId) =>
      axios.delete(`/api/projects/${projectId}`, { withCredentials: true }),
    onSuccess: (data, variables) => {
      const projectId = variables;
      queryClient.setQueryData(["get-user-projects"], (oldProjects) => {
        return oldProjects.filter((project) => project._id !== projectId);
      });
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <NewTemplateCard />
      {data?.map((template) => (
        <TemplateCard
          key={template._id}
          template={template}
          deleteProject={() => deleteMutation.mutate(template._id)}
        />
      ))}
    </Container>
  );
};

export default MyTemplates;
