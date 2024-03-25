import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { TbTemplate } from "react-icons/tb";
import { useRecoilValue } from "recoil";

import Button from "../components/shared/Button";
import homeImage from "../assets/imgs/home_image.png";
import { userInfo } from "../utils/atoms";
import useAuthStatus from "../hooks/useAuthStatus.jsx";

const Container = styled.div`
    display: flex;
    max-width: 960px;
    margin:auto;
    & > :first-child{
      width: 50%;
    }
    & > :last-child{
      width: 50%;
    }
  `;

const Box = styled.div`
    padding-top: 120px;
    display: flex;
    padding-left: 80px;
    flex-direction: column;
    gap: 40px;
  `;

const Title = styled.h3`
    margin-bottom: 20px;
  `;

const Desc = styled.p`
    line-height: 32px;
    word-spacing: 2px;
    font-size: 0.9rem;
    word-wrap: break-word;
  `;

const HomeImage = styled.img`
    margin-top: 180px;
    width:90%;
  `;

const Home = () => {
  useAuthStatus();
  const user = useRecoilValue(userInfo);

  return (
    <Container>
      <Box>
        <div>
          <Title>Drag N Drop</Title>
          <Title>E-mail template</Title>
          <Title>builder</Title>
        </div>
        <Desc>
          드래그 앤 드롭으로 당신의 아이디어를 현실로! <br />
          코딩 없이도 멋진 이메일 템플릿을 만들 수 있는 <br />
          간편한 방법을 경험하세요.
          <br />
          우리의 사용자 친화적인 인터페이스로
          <br />
          마케팅 이메일을 다음 단계로 끌어올리세요.
          <br /> 지금 바로 우리의 드래그 앤 드롭 툴을 체험해 보세요!
        </Desc>
        <Link to={user ? "/dashboard/templates" : "/demo"}>
          <Button>
            Try Demo
            <TbTemplate />
          </Button>
        </Link>
      </Box>
      <Box>
        <HomeImage src={homeImage} alt="home image" />
      </Box>
    </Container>
  );
};

export default Home;
