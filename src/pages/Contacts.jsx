import { useState } from "react";
import { styled } from "styled-components";
import { FaPlus } from "react-icons/fa";

import Loading from "../components/shared/Loading";
import Modal from "../components/shared/Modal";
import { MODAL_TYPE } from "../constants/constants";
import useContact from "../hooks/useContact";

const Container = styled.div`
  width: 80%;
  padding: 100px 0px;
  margin: auto;
  & > div:first-child {
    padding: 0px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & h3 {
      letter-spacing: 1px;
    }
    & button {
      display: flex;
      gap: 4px;
      justify-content: center;
      align-items: center;
      width: 150px;
      font-size: large;
      color: white;
      background-color: #5352ed;
      border: 2px solid #3742fa;
      padding: 5px;
      border-radius: 8px;
      cursor: pointer;
      &:hover{
        background-color: transparent;
        color: #3742fa;
      }
    }
  }
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  font-size: large;
  & > thead > tr {
    & th:first-child {
      width: 10%;
    }
    & th:nth-child(2) {
      width: 25%;
    }
    & th:nth-child(3) {
      width: 40%;
    }
    & th:last-child {
      width: 25%;
    }
  }
  & th {
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
    padding: 10px;
    border: 1px solid;
  }
  & td {
    border: 1px solid;
    text-align: center;
    padding: 5px;
    & > span {
      cursor: pointer;
    }
  }
`;

const Contacts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(MODAL_TYPE.CREATE);
  const [info, setInfo] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { contacts, isLoading } = useContact();

  if (isLoading) {
    return <Loading />;
  }

  const handleCreateModal = () => {
    setModalType(MODAL_TYPE.CREATE);
    setInfo(null);
    openModal();
  };

  const handleUpdateModal = (contact) => {
    setModalType(MODAL_TYPE.UPDATE);
    setInfo(contact);
    openModal();
  };

  return (
    <Container>
      <div>
        <h3>Contacts</h3>
        <button onClick={handleCreateModal}>
          <FaPlus />
          New Contact
        </button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email address</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {contacts?.map((contact, index) => (
            <tr key={contact._id}>
              <td>{index + 1}</td>
              <td>
                <span onClick={() => handleUpdateModal(contact)}>
                  {contact.name}
                </span>
              </td>
              <td>{contact.email}</td>
              <td>{contact.createdAt.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {isModalOpen && (
        <Modal onClose={closeModal} type={modalType} contact={info} />
      )}
    </Container>
  );
};

export default Contacts;
