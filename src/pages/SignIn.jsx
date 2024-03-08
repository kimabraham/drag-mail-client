import { styled } from "styled-components";
import signIn from "../assets/imgs/sign_in.png";
import Logo from "../components/shared/Logo";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { PiSignIn } from "react-icons/pi";

const Container = styled.div`
  display: flex;
`;

const Box = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${signIn});
  background-size: cover;
  background-position: center;
`;

const FormBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction:column;
  gap:20px;
  justify-content: space-around;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Card = styled.div`
  width: 500px;
  padding: 50px 50px;
  border: 1px solid #e4e4e4;
  background-color: white;
  box-shadow: 2px 2px #c1c1c1;
  border-radius: 30px;
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
    width: 100%; /* 전체 너비 사용 */
    &:before,
    &:after {
      content: "";
      flex: 1;
      border-bottom: 1px solid #d8d8d8;
    }
    &:before {
      margin-right: 10px; /* 오른쪽 여백 추가 */
    }
    &:after {
      margin-left: 10px; /* 왼쪽 여백 추가 */
    }
  }
`;

const SignInForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  & > input {
    padding: 10px 20px;
    font-size: large;
    border-radius: 20px;
    border: none;
    background-color: #EFEFEF;
    &:focus{
      background-color: #EFEFEF;
      border: none;
      outline: none;
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
  text-transform: uppercase;
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
  return (
    <Container>
      <Box />
      <FormBox>
        <div>
          <Logo />
          <h3>SIGN IN</h3>
        </div>
        <Card>
          <div>
            <h3>Hello! Welcome Back!</h3>
            <div>
              <span>Don't have an account?</span>
              <Link to="/signup">Sign up</Link>
            </div>
          </div>
          <Button>
            <FaGoogle />
            Sign in with Google
          </Button>
          <span>or</span>
          <SignInForm>
            <input type="text" />
            <input type="text" />
            <Button>
              <PiSignIn />
              Sign In
            </Button>
          </SignInForm>
        </Card>
        <div></div>
      </FormBox>
    </Container>
  );
};

export default SignIn;
