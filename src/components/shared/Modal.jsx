import { useState } from "react";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import { MODAL_TYPE } from "../../constants/constants";
import useContact from "../../hooks/useContact";

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

  const { createContact, deleteContact, updateContact } = useContact();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCreate) {
      createContact.mutate({ name, email });
    } else {
      updateContact.mutate({ contactId: contact._id, name, email });
    }
    onClose();
  };

  const handleDelete = () => {
    deleteContact.mutate(contact._id);
    onClose();
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
