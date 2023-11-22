"use client"
import { BiLeftArrowAlt } from "react-icons/bi"
import { BsBrightnessHigh } from "react-icons/bs"
import { HiOutlineMoon } from "react-icons/hi"
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { FaRegUser } from "react-icons/fa";
import { PerfilUser } from "@/services/perfil";
import { ImPencil } from "react-icons/im";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { getLocalStorageItems, setLocalStorageItems } from "@/utils/helpers";


export default function BarraPerfil() {
  const [perfil, setPerfil] = useState({
    name:"",
    phone:"",
    email:"",
  });
  const [update, setUpdate] = useState({
    name:true,
    phone:true,
    email:true,
  });
  // Esta función cambia el tema
  const [theme, setTheme] = useState(() => {
  
      const storedTheme = getLocalStorageItems("theme");
      return storedTheme || "light";

  });



  const changeModeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    const dataUser = JSON.parse(getLocalStorageItems("user_data"));
    const perfil = async () => {
      const data = await PerfilUser(dataUser.userId);
      setPerfil(data);
    }
    perfil()
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (theme === "dark") {
        document.querySelector("html").classList.add("dark");
      } else {
        document.querySelector("html").classList.remove("dark");
      }
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLocalStorageItems("theme", theme);
    }
  }, [theme]);
  return (
    <div className="w-1/4  dark:bg-gray-800 dark:text-white ">
      <div className="bg-[#0ed3cf] pt-8 pl-5 pb-4 flex flex-wrap text-white space-x-28 ">
        <div className="flex flex-wrap" >
          <Link href="/home"><BiLeftArrowAlt size="30px" /></Link>  
          <p className="ml-3 font-semibold text-lg">Perfil</p>
        </div>
        <div className=" flex flex-wrap  items-center">
          <BsBrightnessHigh onClick={() => changeModeTheme()} size="30px" className=" bg-gray-600 rounded-md mr-8 p-1 dark:bg-inherit " />
          <HiOutlineMoon onClick={() => changeModeTheme()} size="30px" className="dark:bg-gray-600 rounded-md  " />
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-6">
        <div className="w-44 h-44 dark:bg-slate-600 bg-slate-200 rounded-full flex items-center justify-center dark:text-white text-slate-500 text-xl font-semibold">
          <FaRegUser size="60px" />
        </div>
      </div>
      <div className="mt-6 px-6">
        <div className="mb-4">
          <label className="text-gray-600 dark:text-white" >Nombre:</label>
          {update.name ?
            <div className="flex items-center p-3 text-gray-700 dark:text-slate-300 " > {perfil.name}
              <ImPencil className={`ml-4 transition-transform transform hover:scale-125`}
               onClick={() => setUpdate({...update,name:false})} />
            </div> :
            <div className="flex">
              <input
                type="text"
                className="w-48 p-1 border-b  border-gray-300 focus:outline-none dark:text-slate-300 text-gray-700 dark:bg-transparent"
                value={perfil.name}
                onChange={(e)=>setPerfil({...perfil,name:e.target.value})}
             />
              <AiOutlineClose className="ml-2 transition-transform transform hover:scale-125" onClick={() => setUpdate({...update,name:true})} />
              <AiOutlineCheck className="ml-2 transition-transform transform hover:scale-125" onClick={() => setUpdate({...update,name:true})} />
            </div>}
        </div>
        <div className="mb-4">
          <label className="text-gray-600 dark:text-white">Correo:</label>

          {update.email ?
            <div className="flex items-center p-3 flex-wrap text-gray-700 dark:text-slate-300" > {perfil.email}
              <ImPencil className={`ml-1 transition-transform transform hover:scale-125`}
               onClick={() => setUpdate({...update,email:false})}  />
            </div> :
            <div className="flex">
              <input
                type="email"
                className="w-48 p-1 border-b  border-gray-300 focus:outline-none dark:text-slate-300 text-gray-700 dark:bg-transparent"
                value={perfil.email}
                onChange={(e)=>setPerfil({...perfil,email:e.target.value})}
              />
              <AiOutlineClose className="ml-2 transition-transform transform hover:scale-125" onClick={() => setUpdate({...update,email:true})} />
              <AiOutlineCheck className="ml-2 transition-transform transform hover:scale-125" onClick={() => setUpdate({...update,email:true})} />
            </div>}

        </div>
        <div className="mb-4">
          <label className="text-gray-600 dark:text-white">Número de Teléfono:</label>

          {update.phone ?
          <div className="flex items-center p-3 text-gray-700 dark:text-slate-300 " > {perfil.phone}
            <ImPencil className={`ml-4 transition-transform transform hover:scale-125`} 
           onClick={() => setUpdate({...update,phone:false})}  />
          </div> :
          <div className="flex">
            <input
              type="tel"
              className="w-48 p-1 border-b  border-gray-300 focus:outline-none dark:text-slate-300 text-gray-700 dark:bg-transparent"
              value={perfil.phone}
              onChange={(e)=>setPerfil({...perfil,phone:e.target.value})}
            />
            <AiOutlineClose className="ml-2 transition-transform transform hover:scale-125" onClick={() => setUpdate({...update,phone:true})}  />
            <AiOutlineCheck className="ml-2 transition-transform transform hover:scale-125" onClick={() => setUpdate({...update,phone:true})}  />
          </div>}


        </div>
        <Link href="/"><button className="mt-2 bg-[#0ed3cf] text-white p-2 rounded hover:bg-[#0ed3d0b0]">
          cerrar session
        </button></Link>
      </div>
    </div>
  );
}
