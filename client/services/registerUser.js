import { Axios } from "../axios";

export async function registerUser(email, name, password, phone) {
  try {
    const {data} = await Axios.post("/user/register",{email,name,password,phone});
    return data;
  } catch (error) {
  }
}
