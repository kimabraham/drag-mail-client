import { Outlet } from "react-router-dom";
import Header from "./Header";
import { styled } from "styled-components";

const MainContainer = styled.div`
    max-width: 1280px;
    margin: auto;
`;

const Layout = () => {
  return (
    <div>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </div>
  );
};

export default Layout;
