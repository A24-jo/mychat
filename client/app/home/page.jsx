"use client"
import { MdGroups2 } from "react-icons/md"
import { BiDotsVertical } from "react-icons/bi"
import { PiChatsFill } from "react-icons/pi"
import Link from "next/link"
import Chats from "@/components/Chats"
import Contacts from "@/components/Contacts"
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";


function BarraLateral() {

  const [tabs, setTabs] = useState(1);
  
  return (
    <div className=" w-1/4 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-black">
      {/* Encabezado de la barra lateral */}
      <div className="bg-[#0ed3cf] p-4">
        <div className="flex flex-col">
          {/* Avatar del dueño de la cuenta (clickeable) */}
          <div className="flex items-center justify-between">
            {/*mi avatr*/}
            <Link href="/home/perfil">

              <div className="w-12 h-12 dark:bg-slate-800  bg-white rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 text-xl font-semibold" >
                <FaRegUser />
              </div>
            </Link>
            <div className="flex justify-between gap-4">
              <div className="text-slate-700 font-semibold dark:text-slate-100" >{tabs === 1? "CHATS" : "+ FRIENTS" } </div>
              <i
                onClick={() => setTabs(1)}
                className="fas fa-plus-circle text-2xl cursor-pointer text-slate-600 hover:text-gray-400 dark:text-white dark:hover:text-neutral-300">
                <PiChatsFill />
              </i>
              <i
                onClick={() => setTabs(2)}
                className="fas fa-plus-circle text-2xl cursor-pointer text-slate-600 hover:text-gray-400 dark:hover:text-neutral-300 dark:text-white">
                <MdGroups2 />
              </i>
              <i className="fas fa-ellipsis-h text-2xl cursor-pointer text-slate-600 hover:text-gray-400 dark:text-white dark:hover:text-neutral-300" >
                <BiDotsVertical />
                </i>
            </div>
          </div>
        </div>
      </div>
      {/* Lista de chats */}
      <div className=" p-3 border-b-2 dark:border-gray-500 ">
        <input
          type="text"
          placeholder="Buscar en chats..."
          className="flex-auto py-1 px-4 rounded-2xl border border-gray-300 focus:outline-non"
        />
      </div>
      <div className="overflow-y-auto max-h-[500px] " >
        {tabs == 1 && <Contacts />}
        {tabs == 2 && <Chats setTabs={setTabs} />}
      </div>
    </div>
  )
}

export default BarraLateral
