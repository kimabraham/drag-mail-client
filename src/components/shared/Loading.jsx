import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > h5 {
    margin-left: 10px;
    color: #70a1ff;
    letter-spacing: .5px;
  }
`;

const Spinner = styled.div`
  border: 4px solid #bcd3ff;
  border-top: 4px #1e90ff solid;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => {
  return (
    <Container>
      <Spinner />
      <h5>Loading...</h5>
    </Container>
  );
};

export default Loading;
