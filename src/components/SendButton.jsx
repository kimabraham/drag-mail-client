import { useGoogleLogin } from "@react-oauth/google";

const SendButton = ({ onClick }) => {
  const login = useGoogleLogin({
    onSuccess: (result) => {
      const { code } = result;
      onClick(code);
    },
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/gmail.send",
  });

  return <button onClick={() => login()}>Send</button>;
};

export default SendButton;
