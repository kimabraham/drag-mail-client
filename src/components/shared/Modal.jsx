import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import { MODAL_TYPE } from "../../constants/constants";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  & > div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > svg {
        cursor: pointer;
    }
  }
  & > form {
    padding: 50px;
    display: flex;
    flex-direction: column;
    & > div {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        & label {
            color: #3867d6;
            width: 20%;
            text-align: center;
            font-size: larger;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            &::after{
                content:" :";
                color:#3867d6;
            }
        }
        & input {
            width: 80%;
            padding: 10px 15px;
            font-size: large;
            border: none;
            border-bottom: 2px solid #3742fa;
            &:focus{
                outline: none;
            }
            &:-webkit-autofill,
            &:-webkit-autofill:hover,
            &:-webkit-autofill:focus,
            &:-webkit-autofill:active {
                transition: background-color 5000s ease-in-out 0s;
                -webkit-text-fill-color: #000 !important;
            }
        }
    }
    & button {
        width: 80%;
        align-self: flex-end;
        text-transform: uppercase;
        padding: 10px;
        border-radius:10px;
        border: 2px solid #3742fa;
        background-color: transparent;
        color: #3742fa;
        font-weight: bold;
        letter-spacing: 1px;
        font-size: larger;
        cursor: pointer;
        &:hover{
            background-color: #3742fa;
            color:white
        }
    }
    & .submit-button {
        margin-bottom: 20px;
    }
    & .delete-button {
        margin-bottom: 20px;
        border: 2px solid #eb3b5a;
        color: #eb3b5a;
        &:hover{
            background-color: #eb3b5a;
            color:white
        }
    }
  }
`;

const Modal = ({ onClose, type, contact }) => {
  const isCreate = type === MODAL_TYPE.CREATE;
  const [name, setName] = useState(contact?.name || "");
  const [email, setEmail] = useState(contact?.email || "");
  const queryClient = useQueryClient();

  const createContact = useMutation({
    mutationFn: async () =>
      await axios.post(
        "/api/users/contacts",
        { name, email },
        { withCredentials: true }
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(["get-user-contacts"], (prev) => {
        return [...prev, data.data.contact];
      });
      onClose();
    },
  });

  const deleteContact = useMutation({
    mutationFn: (contactId) =>
      axios.delete(`/api/contacts/${contactId}`, {
        withCredentials: true,
      }),
    onSuccess: (data, variables) => {
      const contactId = variables;
      queryClient.setQueryData(["get-user-contacts"], (prev) => {
        return prev.filter((contact) => contact._id !== contactId);
      });
      onClose();
    },
  });

  const updateContact = useMutation({
    mutationFn: (contactId) =>
      axios.put(
        `/api/contacts/${contactId}`,
        { name, email },
        { withCredentials: true }
      ),
    onSuccess: (result) => {
      console.log(result);
      const updatedContact = result.data.contact;

      queryClient.setQueryData(["get-user-contacts"], (prev) => {
        return prev.map((contact) =>
          contact._id === updatedContact._id ? updatedContact : contact
        );
      });

      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCreate) {
      createContact.mutate();
    } else {
      updateContact.mutate(contact._id);
    }
  };

  const handleDelete = () => {
    deleteContact.mutate(contact._id);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <div>
          <h5>{isCreate ? "Create new Contact" : "Update Contact"}</h5>
          <RxCross2 size={40} onClick={onClose} />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" value="Name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" value="Email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="submit-button">
            {isCreate ? "Submit" : "Update"}
          </button>
          {!isCreate && (
            <button className="delete-button" onClick={handleDelete}>
              delete
            </button>
          )}
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
