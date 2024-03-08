import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

import logo from "../../assets/imgs/logo.png";

const Head = styled.header`
  padding: 15px 20px;
  max-width: 1280px;
  margin: auto;
`;

const Logo = styled.img.attrs((props) => ({
  src: logo,
  alt: "logo_image",
}))`
  height: 65px;
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
`;

const Link = styled(NavLink).attrs((props) => ({
  active: props.active,
}))`
  color: black;
  text-decoration: none;
  text-transform: uppercase;
  font-size: larger;
  letter-spacing: .5px;
  font-weight: 600;
  transition: color .2s;
  &:hover{
    color: ${(props) => props.theme.primary};
  }
`;

const Header = () => {
  return (
    <Head>
      <Navbar>
        <NavLink>
          <Logo />
        </NavLink>
        <Menu>
          <MenuItem>
            <Link to="/signin">login</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/signup">sign up</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/demo">demo editor</Link>
          </MenuItem>
        </Menu>
      </Navbar>
    </Head>
  );
};

export default Header;
