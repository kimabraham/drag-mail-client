import React from "react";
import logo from "../../assets/imgs/logo.png";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const LogoImage = styled.img`
  height: ${(props) => props.size || "65px"};
`;

const Logo = ({ size }) => {
  return (
    <NavLink to="/">
      <LogoImage size={size} src={logo} alt="logo image" />
    </NavLink>
  );
};

export default Logo;
