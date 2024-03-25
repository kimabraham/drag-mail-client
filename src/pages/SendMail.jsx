import { useState } from "react";
import { useRecoilValue } from "recoil";
import { MdCancel } from "react-icons/md";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import Loading from "../components/shared/Loading";
import { userInfo } from "../utils/atoms";
import useContact from "../hooks/useContact";
import useProjects from "../hooks/useProjects";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import SendButton from "../components/SendButton";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
  & > ul {
    display: flex;
    flex-wrap: wrap;
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
  const user = useRecoilValue(userInfo);
  const { contacts } = useContact();
  const { projects } = useProjects();
  const { state, search } = useLocation();
  const [receivers, setReceivers] = useState(
    state?.isToMe ? [{ name: user?.name, email: user?.email }] : []
  );
  const [subject, setSubject] = useState("");
  const [template, setTemplate] = useState(state?.project);
  const { mutate: sendMail } = useMutation({
    mutationKey: ["sendMail"],
    mutationFn: async (data) => {
      await axios.post("/api/mails", data, { withCredentials: true });
    },
  });

  const handleSubmit = (code) => {
    sendMail({ subject, template, receivers, code });
  };

  const handleSelect = (e) => {
    const newEmail = e.target.value;
    const isExist = receivers.find((receiver) => receiver.email === newEmail);
    if (newEmail && !isExist) {
      const contact = contacts.find((contact) => contact.email === newEmail);
      setReceivers((prev) => [
        ...prev,
        { email: newEmail, name: contact.name },
      ]);
    }
  };

  const handleDeleteReceiver = (email) => {
    setReceivers(receivers.filter((receiver) => receiver.email !== email));
  };

  const handleSubject = (e) => {
    setSubject(e.target.value);
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <Container>
      <div>
        <h3>Send mail</h3>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <SendButton onClick={handleSubmit} />
        </GoogleOAuthProvider>
      </div>
      <Receivers>
        <h4>To.</h4>
        <ul>
          {receivers.map((receiver) => (
            <li key={receiver.email}>
              <span>{receiver.email}</span>
              <MdCancel
                size={20}
                onClick={() => handleDeleteReceiver(receiver.email)}
              />
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
      <Form>
        <div>
          <label htmlFor="friendsList">Friends</label>
          <select
            name="friends"
            id="friendsList"
            onChange={handleSelect}
            defaultValue=""
          >
            <option value="">Select a friend</option>
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
          <input
            type="text"
            id="subject"
            placeholder="Input email subject"
            value={subject}
            onChange={handleSubject}
          />
        </div>
        <div>
          <label htmlFor="templateList">templates</label>
          <select
            name="projects"
            id="templateList"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          >
            <option value="">Select a template</option>
            {projects?.map((project) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>
      </Form>
    </Container>
  );
};

export default SendMail;
