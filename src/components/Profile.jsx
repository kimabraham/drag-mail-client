import PropTypes from "prop-types";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

import { userInfo } from "../utils/atoms";
import useLogout from "../hooks/useLogout";
import useAuthStatus from "../hooks/useAuthStatus";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 4px;
  position: relative;
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

const Popup = styled.ul`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: 200px;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-transform: uppercase;
  & > li {
    cursor: pointer;
    &:hover {
      color: white;
      background-color: #7f8c8d;
    }
    &:first-child:hover {
      border-radius: 10px 10px 0 0;
    }
    &:last-child:hover {
      border-radius: 0 0 10px 10px;
    }
  }
  & > li > a {
    letter-spacing: .5px;
    font-size: large;
    padding: 15px 20px;
    display: block;
    width: 100%;
    color: black;
    text-decoration: none;
    &:hover{
      color: white;
    }
  }
  & > li:nth-child(2), & > li:last-child {
    padding: 15px 20px;
    letter-spacing: .5px;
    font-size: large;
  }
`;

const Profile = ({ position: { top, left } }) => {
  const user = useRecoilValue(userInfo);
  const { isLoading } = useAuthStatus();
  const [showPopup, setShowPopup] = useState(false);
  const handleLogout = useLogout();

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      {!isLoading && (
        <Container onClick={handlePopup}>
          <Avatar src={user?.avatarUrl} alt="avatar image" />
          <div>
            <span>Account</span>
            <h6>{user?.name}</h6>
          </div>
          {showPopup && (
            <Popup top={top} left={left}>
              <li>
                <Link to="/dashboard/profile">profile</Link>
              </li>
              <li>theme</li>
              <li onClick={handleLogout}>Logout</li>
            </Popup>
          )}
        </Container>
      )}
    </>
  );
};

Profile.propTypes = {
  position: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
  }),
};

export default Profile;
