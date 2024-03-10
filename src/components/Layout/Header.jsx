import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";

import Logo from "../shared/Logo";
import { userInfo } from "../../utils/atoms";
import axios from "axios";

const Head = styled.header`
  padding: 15px 20px;
  max-width: 1280px;
  margin: auto;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Menu = styled.ul`
  display: flex;
  & > li{
    margin-right: 50px;
  }
  &> li:last-child{
    margin:0px;
  }
`;

const MenuItem = styled.li`
  text-transform: uppercase;
  font-size: larger;
  font-weight: 600;
  transition: color .2s;
  letter-spacing: .5px;
  cursor: pointer;
  &:hover{
    color: ${(props) => props.theme.primary};
  }
`;

const Link = styled(NavLink).attrs((props) => ({
  active: props.active,
}))`
  color: black;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: .5px;
  transition: color .2s;
  &:hover{
    color: ${(props) => props.theme.primary};
  }
`;

const Header = () => {
  const [user, setUser] = useRecoilState(userInfo);

  const handleLogout = async () => {
    await axios.get("/api/auth/logout", { withCredentials: true });
    setUser(null);
  };

  return (
    <Head>
      <Navbar>
        <Logo />
        <Menu>
          {user ? (
            <>
              <MenuItem onClick={handleLogout}>logout</MenuItem>
              <MenuItem>
                <Link to="/dashboard/templates">dashboard</Link>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <Link to="/signin">login</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/signup">sign up</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/demo">demo editor</Link>
              </MenuItem>
            </>
          )}
        </Menu>
      </Navbar>
    </Head>
  );
};

export default Header;
