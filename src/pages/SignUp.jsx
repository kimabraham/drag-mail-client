import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { PiSignIn } from "react-icons/pi";

import Logo from "../components/shared/Logo";

const Container = styled.div`
  display:flex;
  flex-direction:column;
  justify-content: space-between;
  align-items: center;
  gap: 100px;
  padding: 100px;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > h3 {
      margin-top: 15px;
    }
  }
`;

const Card = styled.div`
  width: 500px;
  padding: 50px 50px;
  border: 1px solid #e4e4e4;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  & > div > div  {
    padding-top: 20px;
    & > span {
      font-size: large;
      margin-right: 10px;
    }
    & > a{
      color: ${(props) => props.theme.accent};
      text-decoration: none;
      font-weight: 600;
  }
  }
  & > span {
    font-size: large;
    color: #838383;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;
    &:before,
    &:after {
      content: "";
      flex: 1;
      border-bottom: 1px solid #d8d8d8;
    }
    &:before {
      margin-right: 10px;
    }
    &:after {
      margin-left: 10px;
    }
  }
  & h3 {
    line-height: 50px;
  }
`;

const Button = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 20px;
  background-color: ${(props) => props.theme.primary};
  color: white;
  letter-spacing: .4px;
  font-size: medium;
  cursor: pointer;
  margin-top: 10px;
  &:hover{
    background-color: ${(props) => props.theme.accent};
    border: 1px solid ${(props) => props.theme.accent};
  }
`;

const SignUp = () => {
  const handleLogin = () => {
    window.open("/api/auth/google", "_self");
  };

  return (
    <Container>
      <div>
        <Logo />
        <h3>Sign Up</h3>
      </div>
      <Card>
        <div>
          <h3>Get Started with a Free Account</h3>
          <div>
            <span>Already have an account?</span>
            <Link to="/signin">Sign In</Link>
          </div>
        </div>
        <Button onClick={handleLogin}>
          <FaGoogle />
          Sign in with Google
        </Button>
      </Card>
    </Container>
  );
};

export default SignUp;
