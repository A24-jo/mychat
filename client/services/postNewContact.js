import { Axios } from "@/axios";

export async function postNewContact({ userId, contactId }) {
  try {
    const { data } = await Axios.post(`contacts/create/${userId}/${contactId}`);
    return data
  } catch (error) {
    return {
      error: true,
    };
  }
}
