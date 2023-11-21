import { Axios } from "@/axios";

export async function loginUser({email,phone, password}) {
  try {
    const {data} = await Axios.post("/user/login", { email, phone, password });
    return data
  } catch (error) {
    console.log(error);
    return {error: true}
  }
}
