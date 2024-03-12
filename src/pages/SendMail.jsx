import { styled } from "styled-components";

const Container = styled.div`
  width: 80%;
  padding: 100px 0px;
  margin: auto;
  & > div {
    display: flex;
  }
`;

const SendMail = () => {
  return (
    <Container>
      <div>
        <h3>Send mail</h3>
        <button>Send</button>
      </div>
    </Container>
  );
};

export default SendMail;
