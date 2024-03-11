import { useRecoilValue } from "recoil";
import { userInfo } from "../utils/atoms";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 4px;
  cursor: pointer;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 2px;
    & > span{
      font-size: .8rem;
      font-weight: 600;
      letter-spacing: .4px;
      color: #7f8c8d;
    }
    & > h6 {
      color: #636e72;
      font-weight: 600;
    }
  }
`;

const Avatar = styled.img`
  width: 40px;
  border-radius: 25px;
  border: 3px solid #bdc3c7;
`;

const Profile = () => {
  const user = useRecoilValue(userInfo);

  return (
    <Container>
      <Avatar src={user?.avatarUrl} alt="avatar image" />
      <div>
        <span>Account</span>
        <h6>{user?.name}</h6>
      </div>
    </Container>
  );
};

export default Profile;
