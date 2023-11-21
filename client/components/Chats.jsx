'use client'

import { getAllChats, setSelectedUser } from "@/redux/features/chatSlice";
import { postNewContact } from "@/services/postNewContact";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Chats = ({setTabs}) => {

  const chats = useSelector((state) => state.chat.chats);
  const userData = useSelector((state) => state.user.userData);

  const dispatch = useDispatch();
 
  const handleClick = async (contact) => {

    const newContact  = await postNewContact({userId: userData.userId,contactId:contact.userId})
    if( typeof newContact === "string"){
      return toast.error(newContact)
    }
    const data = {...newContact,avatarColor:'#39A29D'};
    dispatch(setSelectedUser(data));
    setTabs(1)
  }

  useEffect(() => {
    dispatch(getAllChats());
  }, []);

  return (
    <ul >
       {chats?.map((chat) => {
        return ( 
          <li key={chat.id} onClick={_ => handleClick(chat)} className="p-4 hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-600">
            <div className="flex items-center">
              {/*avtar del amigo*/}
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-semibold">
              {chat.name[0]}
              </div>
              <div className="ml-4">
                <h2 className="text-md font-semibold dark:text-white text-slate-700">
                  {chat.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Último mensaje
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Chats;
