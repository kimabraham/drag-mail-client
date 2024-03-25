import { NavLink, Outlet } from "react-router-dom";
import { styled } from "styled-components";

import Logo from "../components/shared/Logo";
import Profile from "../components/Profile";
import useAuthStatus from "../hooks/useAuthStatus";

const Container = styled.div`
  width: 100%;
  display: flex;
  height: 100vh;
`;

const SideBar = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 300px;
  height: 100vh;
  padding: 40px 30px;
  border-right: 1px solid #dde0e4;
  background-color: ${(props) => props.theme.background};
  overflow-y: auto;
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Item = styled.li`
`;

const Content = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const StyleLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  font-size: larger;
  letter-spacing: .4px;
  font-weight: 600;
  transition: color 0.2s;
  &:hover {
    color: ${(props) => props.theme.primary};
  }
  &.active {
    color: ${(props) => props.theme.primary};
  }
`;

const Dashboard = () => {
  useAuthStatus();
  return (
    <Container>
      <SideBar>
        <Logo />
        <Menu>
          <Item>
            <StyleLink to="/dashboard/templates">My templates</StyleLink>
          </Item>
          <Item>
            <StyleLink to="/dashboard/basic">Basic</StyleLink>
          </Item>
          <Item>
            <StyleLink to="/dashboard/contacts">Contacts</StyleLink>
          </Item>
          <Item>
            <StyleLink to="/dashboard/send">Send Mail</StyleLink>
          </Item>
        </Menu>
        <Profile position={{ top: -180, left: 10 }} />
      </SideBar>
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};

export default Dashboard;
