"use client"
import { useEffect, useState } from "react";
import { BsEmojiSunglasses } from "react-icons/bs";
import ModalConfirmSubmit from "@/components/ModalConfirmSubmit";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorageItems } from "@/utils/helpers";
import { postUserData } from "@/redux/features/userSlice";
import Image from "next/image";
import { allMessages, postNewMessage } from "@/services/postNewMessage";
import { notificationss, resetMessagesOrUpdate, setNewMessage } from "@/redux/features/chatSlice";
import { Dates } from "@/services/date";
import { receiver } from "@/services/statusMessage";
import { CgRadioCheck } from "react-icons/cg";
import { CgRadioChecked } from "react-icons/cg";
import { CgCheckO } from "react-icons/cg";


export default function HomeLayout({ children }) {
  const user = useSelector(state => state.user.userData)
  const selectedUser = useSelector(state => state.chat.selectedUser)
  const messagessNew = useSelector(state => state.chat.messages)
  const userLocalestorage = localStorage.getItem("user_data");
  const dispatch = useDispatch()

  const [show, setShow] = useState(false);
  const [input, setInput] = useState({
    numero: 1,
    text: ''
  })

  const textInput = (e) => {
    setInput({ ...input, text: e })
  }

  const receiverLog = async () => {
    const userId = JSON.parse(userLocalestorage);
    const valor = "1";
    await receiver(userId.userId, valor);
  };

  const initialConnection = (userLocalStrId = false) => {
    socket.connect()
    socket.emit("join_room", { userId: user?.userId ?? userLocalStrId })
    socket.on("new_message", (message) => {

      receiverLog()

      const data = localStorage.getItem("selectedUser")
      const audio = new Audio("/Notificación.mp3");
      audio.play();

      if (message.sender === data) {
        dispatch(setNewMessage(message))
      }
      
      dispatch(notificationss(message));
    })
  }



  const handleClick = async () => {

    const date = Dates()
    await postNewMessage({
      message: input.text,
      receiver: selectedUser.userId,
      sender: user.userId,
      status: "0",
      type: "0",
      updateAt: date,
      createAt: date
    })

    dispatch(setNewMessage({
      message: input.text,
      receiver: selectedUser.userId,
      sender: user.userId,
      status: 0,
      type: 0,
      updateAt: date,
      createAt: date
    }))

    socket.emit("send_message", {
      message: input.text,
      receiver: selectedUser.userId,
      sender: user.userId,
      status: 0,
      type: 0,
      updateAt: date,
      createAt: date
    })
    setInput({ ...input, text: "" })

  }

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (typeof window !== 'undefined') {
      if (theme === "dark") {
        document.querySelector("html").classList.add("dark");
      } else {
        document.querySelector("html").classList.remove("dark");
      }
    };
    receiverLog();
  }, []);

  useEffect(() => {
    if (!Object.entries(user).length) {
      const userDataLocalStr = getLocalStorageItems('user_data')
      const userDataFormated = JSON.parse(userDataLocalStr)
      dispatch(postUserData(userDataFormated))
      initialConnection(userDataFormated.userId)
    } else initialConnection();
  }, [])

  useEffect(() => {

    const data = async () => {
      const datos = await allMessages({ userID: user.userId, contact: selectedUser.userId });
      dispatch(resetMessagesOrUpdate(datos.data))
    }
    data()
    localStorage.setItem("selectedUser", selectedUser.userId);

  }, [selectedUser]);


  return (
    <div className="h-screen flex dark:bg-gray-900 dark:text-white">
      {children}
      {!!Object.entries(selectedUser).length ? (<div className="flex-1 flex flex-col">
        {/* Encabezado del chat */}
        <div className="bg-gray-200 p-4 border-b border-gray-300 dark:border-gray-600 dark:bg-gray-700">
          <div className="flex items-center">
            {/*avtar del amigo*/}
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-semibold"
              style={{ backgroundColor: selectedUser?.avatarColor }}
            >
              {selectedUser.name[0]}
            </div>

            <h2 className="text-lg dark:text-white ml-4 text-slate-600 font-bold">
              {selectedUser?.name}
            </h2>
          </div>
        </div>
        {/* Lista de mensajes */}
        <div className="flex-1 p-4 overflow-y-auto ">
          {messagessNew?.map((data, index) => { 

            const isSender = data.sender === user.userId;

            const fechaObjeto = new Date(data.createAt);
            const hora = fechaObjeto.toISOString().slice(11, 19);

            return (
              <div key={index} className={`relative flex ${isSender ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`relative inline-block p-2 mb-2 rounded-lg ${isSender ? 'bg-[#0ed3cf] text-white' : 'dark:bg-[#2a2d30] bg-[#767777] text-white'}`}
                >
                  {data.message}
                  <div className="flex">
                     <h6 className="dark:text-slate-500 font-bold text-xs ">{hora} </h6>
                     <div className="ml-3">
                      {data.status == 0 && <CgRadioCheck />}
                      {data.status == 1 && <CgRadioChecked />}
                      {data.status == 2 && <CgCheckO />}
                      </div>
                  </div>
                 
                  <div
                    className={`absolute ${isSender ? ' right-[-8px]' : ' left-[-8px]'} bottom-8 w-1 h-1 border-t-8 border-transparent border-r-8 border-l-8 ${isSender ? 'border-t-[#0ed3cf]' : 'border-t-[#767777] dark:border-t-[#2a2d30]'
                      }`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Área de composición de mensaje */}
        <div className="  dark:bg-gray-800  bg-gray-100 p-4 border-t border-gray-300 dark:border-gray-600">
          <div className="flex items-center">
            <div onClick={_ => setShow(!show)} className="mr-2 p-2 rounded-lg hover:bg-[#0ed3cf] dark:hover:bg-[#0ed3cf] dark:text-slate-100 text-slate-600 hover:text-white" >
              <BsEmojiSunglasses size="25px " />
            </div>
            <input
              type="text"
              className="flex-1 py-2 px-4 rounded-full border border-gray-300 focus:outline-none dark:text-black"
              placeholder="Escribe un mensaje..."
              value={input.text}
              onChange={(e) => textInput(e.target.value)}
            />
            <button onClick={handleClick} className="ml-4 px-4 py-2 bg-[#0ed3cf] text-white rounded-full hover:bg-[#0ed3d0b0]">
              Enviar
            </button>

          </div>
        </div>
      </div>) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col gap-6 items-center justify-center">
            <h1 className="text-lg">Selecciona un usuario para chatear</h1>
            <Image src="/cta-img.svg" height={300} width={500} alt="no-user-selected" />
          </div>
        </div>
      )}
      <ModalConfirmSubmit show={show} setShow={setShow} setInput={setInput} />
    </div>
  );
}