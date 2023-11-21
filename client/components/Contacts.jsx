"use client";

import { NewNotificate, formtContact, getAllContacts, setSelectedUser } from "@/redux/features/chatSlice";
import { getRandomColor } from "@/services/colorRamdon";
import { numberTheNotifications, visto } from "@/services/statusMessage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Contacts = () => {

  const contacts = useSelector(state => state.chat.contacts)
  const userLocalestorage = localStorage.getItem('user_data');
  const notificatios = useSelector(state => state.chat.messagesNew)
  const dispatch = useDispatch();

  const messageVisto = async (contactId)=>{
    const userId = JSON.parse(userLocalestorage);
        const chat = await visto(userId.userId,contactId);
        dispatch(formtContact(chat));
  }

  const openchat = (data, avatarColor) => {
    const datos = { ...data, avatarColor: avatarColor }
    dispatch(setSelectedUser(datos));
    messageVisto(data.userId);
  }

  useEffect(() => {
    const userId = JSON.parse(userLocalestorage);
    const verified = async () => {
      const data = await numberTheNotifications(userId.userId);
      dispatch(NewNotificate(data))
    }
    verified();
  }, [])

  useEffect(() => {
    dispatch(getAllContacts())
  }, [notificatios])


  return (
    <ul className="overflow-y-auto">
      {contacts?.map((contact) => {

        const modifiedContact = { ...contact };
        modifiedContact.notifications = 0;
        notificatios.forEach((notification) => {
          if (modifiedContact.userId === notification.sender ) {
            modifiedContact.notifications += 1;
          }
        });

        const avatarColor = getRandomColor();

        return (
          <li key={modifiedContact.id} className="p-4 hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-600">
            <div className="flex items-center" onClick={() => openchat(contact, avatarColor)}>
              {/* Avatar del amigo */}
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-semibold"
                style={{ backgroundColor: avatarColor }}>
                {contact.name[0]}
              </div>
              <div className="ml-4">
                <h2 className="text-md font-semibold dark:text-white text-slate-700">
                  {contact.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Último mensaje
                </p>
              </div>
              {modifiedContact.notifications !== 0 && (
                <div className="ml-6 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                  {modifiedContact.notifications}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>

  );
};

export default Contacts;
