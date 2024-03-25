import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Logo from "../components/shared/Logo";

const Container = styled.div`
  display: flex;
  padding-top: 10%;
`;

const FormBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction:column;
  gap: 80px;
  justify-content: space-around;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & h3 {
    margin-top: 20px;
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
    padding-top: 15px;
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

const SignIn = () => {
  const handleLogin = () => {
    window.open("/api/auth/google", "_self");
  };

  return (
    <Container>
      <FormBox>
        <div>
          <Logo />
          <h3>Sign In</h3>
        </div>
        <Card>
          <div>
            <h3>Hello! Welcome Back!</h3>
            <div>
              <span>Don&apos;t have an account?</span>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
          <Button onClick={handleLogin}>
            <FaGoogle />
            Sign in with Google
          </Button>
          {/* <span>or</span>
          <SignInForm onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter an email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button>
              <PiSignIn />
              Sign In
            </Button>
          </SignInForm> */}
        </Card>
        <div></div>
      </FormBox>
    </Container>
  );
};

export default SignIn;
