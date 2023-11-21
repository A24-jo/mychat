import { Axios } from "../axios";

export async function registerUser(email, name, password, phone) {
  try {
    await Axios.post("/user/register",{email,name,password,phone})
  } catch (error) {
  }
}
