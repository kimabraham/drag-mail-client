import { NavLink, Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Logo from "../components/shared/Logo";
import Profile from "./Profile";

const Container = styled.div`
  display: flex;
`;

const SideBar = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20%;
  height: 100vh;
  padding: 40px 30px;
  border-right: 1px solid #dde0e4;
  background-color: ${(props) => props.theme.background};
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Item = styled.li`
`;

const StyleLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  text-transform: uppercase;
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
        <Profile />
      </SideBar>
      <div>
        <Outlet />
      </div>
    </Container>
  );
};

export default Dashboard;
