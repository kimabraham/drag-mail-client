import React from "react";
import logo from "../../assets/imgs/logo.png";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const LogoImage = styled.img.attrs((props) => ({
  src: logo,
  alt: "logo_image",
}))`
    height: 65px;
  `;

const Logo = () => {
  return (
    <NavLink to="/">
      <LogoImage />
    </NavLink>
  );
};

export default Logo;
