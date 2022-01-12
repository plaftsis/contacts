import axios from "axios";

export const getContacts = async () => {
  const { data } = await axios.get("contacts");
  return data;
}

export const addContact = async (contact) => {
  const { data } = await axios.post("contacts", contact);
  return data;
};

export const getContact = async (id) => {
  const { data } = await axios.get(`contacts/${id}`);
  return data;
}

export const editContact = async ({id, contact}) => {
  const { data } = await axios.put(`contacts/${id}`, contact);
  return data;
};

export const deleteContact = async (id) => {
  const { data } = await axios.delete(`contacts/${id}`);
  return data;
}

export const getEditHistory = async (id) => {
  const { data } = await axios.get(`/contacts/${id}/audits`);
  return data;
}
