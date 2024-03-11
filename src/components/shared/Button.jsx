import { styled } from "styled-components";
import propTypes from "prop-types";

const StyleButton = styled.button`
    display: inline-flex;
    gap: 4px;
    justify-content: center;
    align-items: center;
    width: 40%;
    color: white;
    background-color: ${(props) => props.theme.accent};
    margin-left: 40px;
    padding: 10px;
    border: none;
    border-radius: 10px;
    font-size: larger;
    letter-spacing: .2px;
    cursor: pointer;
`;

const Button = ({ children }) => {
  return <StyleButton>{children}</StyleButton>;
};

Button.propTypes = {
  children: propTypes.node.isRequired,
};

export default Button;
