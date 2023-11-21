import { Axios } from "@/axios";

// interface NewMessageDTO {
//     message: string;
//     sender: string;
//     receiver: string;
//     type: number;
// }

export async function postNewMessage({ sender, receiver, message, type,status,updateAt ,createAt}) {
  try {

    await Axios.post("/message/create", { sender, receiver, message, type , status, updateAt ,createAt });

    return {
      error: false,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
    };
  }
}

export async function allMessages({userID, contact}){
   try {

   const data = await Axios.post(`/message/allmessages/${userID}/${contact}`);
   return data;

   } catch (error) {
    return [];  
   }
}
