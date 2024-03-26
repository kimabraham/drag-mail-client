import { styled } from "styled-components";

import NewTemplateCard from "../components/Template/NewTemplateCard";
import TemplateCard from "../components/Template/TemplateCard";
import Loading from "../components/shared/Loading";
import useProjects from "../hooks/useProjects";

const Container = styled.div`
  padding: 150px 0px;
  & > div:first-child {
    width: 80%;
    margin: auto;
  }
`;

const Grid = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  column-gap: 40px;
`;

const MyTemplates = () => {
  const { projects, isLoading, deleteProject } = useProjects();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <div>
        <h4>My templates</h4>
      </div>
      <Grid>
        <NewTemplateCard />
        {projects?.map((template) => (
          <TemplateCard
            key={template._id}
            template={template}
            deleteProject={() => deleteProject.mutate(template._id)}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default MyTemplates;
