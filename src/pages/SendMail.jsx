import { useState } from "react";
import { useRecoilValue } from "recoil";
import { MdCancel } from "react-icons/md";
import { styled } from "styled-components";

import { userInfo } from "../utils/atoms";
import useContact from "../hooks/useContact";

const Container = styled.div`
  width: 80%;
  padding: 100px 0px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  & > div:first-child {
    display: flex;
    justify-content: space-between;
    & > h3 {
      text-transform: uppercase;
      letter-spacing: .5px;
    }
    & > button {
      width: 10%;
      font-size: large;
      text-transform: uppercase;
      letter-spacing: .5px;
      font-weight: bold;
      background-color: #ff6b81;
      border: 2px solid #ff4757;
      color: white;
      cursor: pointer;
      border-radius: 10px;
      &:hover{
        background-color: transparent;
        color: #ff4757;
      }
    }
  }
`;

const Receivers = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  & > ul {
    display: flex;
    gap: 10px;
    & > li {
      background-color: #dfe4ea;
      padding: 4px 10px;
      border-radius: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #57606f;
      & > span {
        padding: 0 15px 0 20px;
      }
      & > svg{
        color: #2f3542;
        cursor: pointer;
        float: right;
      }
    }
  }
`;

const Sender = styled.div`
  display: flex;
  gap: 10px;
  align-items:center;
  & > span {
    font-size: large;
    font-weight: bold;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  & > div {
    display: flex;
    align-items: center
    ;
    width: 100%;
    & > label {
      font-size: larger;
      font-weight: bold;
      letter-spacing: 1px;
      padding: 0 10px;
      width: 15%;
      &::after {
        content: " :";
      }
    }
    & > input, & > select {
      width: 80%;
      font-size: larger;
      padding: 5px 15px;
    }
  }
`;

const SendMail = () => {
  const [receivers, setReceivers] = useState([]);
  const { contacts } = useContact();
  const user = useRecoilValue(userInfo);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSelect = (e) => {
    const newEmail = e.target.value;
    if (newEmail && !receivers.includes(newEmail)) {
      setReceivers([...receivers, newEmail]);
    }
  };

  return (
    <Container>
      <div>
        <h3>Send mail</h3>
        <button onClick={handleSubmit}>Send</button>
      </div>
      <Receivers>
        <h4>To.</h4>
        <ul>
          {receivers.map((receiver) => (
            <li key={receiver}>
              <span>{receiver}</span>
              <MdCancel size={20} />
            </li>
          ))}
        </ul>
      </Receivers>
      <Sender>
        <h4>From. </h4>
        <span>
          {user?.email} ( {user?.name} )
        </span>
      </Sender>
      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="friendsList">Friends</label>
          <select
            name="friends"
            id="friendsList"
            onChange={handleSelect}
            defaultValue=""
          >
            <option value="">Select a friend</option>{" "}
            {contacts?.map((contact) => (
              <option
                onClick={handleSelect}
                key={contact._id}
                value={contact.email}
              >
                {contact.email} ({contact.name})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" />
        </div>
        <div>
          <label htmlFor="templateList">templates</label>
          <select name="" id="templateList">
            <option value="1">ghfhffhfhfhfh</option>
            <option value="1">ghfhffhfhfhfh</option>
            <option value="1">ghfhffhfhfhfh</option>
            <option value="1">ghfhffhfhfhfh</option>
            <option value="1">ghfhffhfhfhfh</option>
          </select>
        </div>
      </Form>
    </Container>
  );
};

export default SendMail;
