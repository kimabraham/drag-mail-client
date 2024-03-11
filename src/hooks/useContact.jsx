import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useContact = () => {
  const queryClient = useQueryClient();

  const { data: contacts, isLoading } = useQuery({
    queryKey: ["get-user-contacts"],
    queryFn: async () => {
      const res = await axios.get("/api/users/contacts", {
        withCredentials: true,
      });
      return res.data.contacts;
    },
  });

  const createContact = useMutation({
    mutationFn: ({ name, email }) =>
      axios.post(
        "/api/users/contacts",
        { name, email },
        { withCredentials: true }
      ),
    onSuccess: (result) => {
      queryClient.setQueryData(["get-user-contacts"], (prev) => {
        return [...prev, result.data.contact];
      });
    },
  });

  const deleteContact = useMutation({
    mutationFn: (contactId) =>
      axios.delete(`/api/contacts/${contactId}`, {
        withCredentials: true,
      }),
    onSuccess: (result, variables) => {
      const contactId = variables;
      queryClient.setQueryData(["get-user-contacts"], (prev) => {
        return prev.filter((contact) => contact._id !== contactId);
      });
    },
  });

  const updateContact = useMutation({
    mutationFn: ({ contactId, name, email }) =>
      axios.put(
        `/api/contacts/${contactId}`,
        { name, email },
        { withCredentials: true }
      ),
    onSuccess: (result) => {
      const updatedContact = result.data.contact;

      queryClient.setQueryData(["get-user-contacts"], (prev) => {
        return prev.map((contact) =>
          contact._id === updatedContact._id ? updatedContact : contact
        );
      });
    },
  });

  return { contacts, isLoading, createContact, deleteContact, updateContact };
};

export default useContact;
