"use client";

import { registerUser } from "@/services/registerUser";
import RegisterValidate from "@/utils/register";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Register() {

  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const [Validate, setValidate] = useState({
    email: false,
    password: false,
    phone: false,
    name: false
  });

  const [loading , setLoading ] = useState(false);

  const navigate = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datas = RegisterValidate(
      registerForm.email,
      registerForm.name,
      registerForm.password,
      registerForm.phone,
      setValidate);
   

    setLoading (true);
    if (datas === "error"){

      setLoading (false);
       return
      };
    // Agregar lógica para el registro aquí
    await registerUser(registerForm.email, registerForm.name, registerForm.password, registerForm.phone);

    navigate.push("/");

  };

  const handleFormChange = ({ target }) => {
    setRegisterForm(prev => ({ ...prev, [target.name]: target.value }))
  }

  return (
    <div className="bg-black flex justify-center items-center h-screen">
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://tailwindcomponents.com/svg/queue-animate.svg"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      {/* Right: Registration Form */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          {/* Email/Phone Input */}
          <div className="mb-4">
            <label className="block text-gray-300">Name</label>
            <input
              onChange={handleFormChange}
              name="name"
              value={registerForm.name}
              type="text"
              className="w-full border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400 bg-black text-white"
            />
            {Validate.name && <label className="block text-gray-300">"Por favor, ingrese un nombre válido (mínimo 3 caracteres)." </label>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Email</label>
            <input
              onChange={handleFormChange}
              name="email"
              value={registerForm.email}
              type="text"
              className="w-full border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400 bg-black text-white "
            />
            {Validate.email && <label className="block text-gray-300">"Por favor, ingrese un correo electrónico válido."</label>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-200">Phone</label>
            <input
              onChange={handleFormChange}
              name="phone"
              value={registerForm.phone}
              type="text"
              className="w-full border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400 bg-black text-white "
            />
            {Validate.phone && <label className="block text-gray-300">"Por favor, ingrese un número de teléfono válido (al menos 5 dígitos)."</label>}
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-200">Password</label>
            <input
              onChange={handleFormChange}
              name="password"
              value={registerForm.password}
              type="password"
              className="w-full border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400 bg-black text-white "
            />
            {Validate.password && <label className="block text-gray-300">"La contraseña debe tener al menos 8 caracteres"</label>}
          </div>
          <button
            type="submit"
            className="bg-[#0ed3cf] hover:bg-[rgba(14,211,208,0.63)] text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            {loading  ? <div className="flex justify-center py-2 px-4 w-full ">
              <div className="flex flex-row gap-2 ">
                <div className="w-2 h-2 rounded-full bg-slate-800 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-slate-800 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-2 h-2 rounded-full bg-slate-800 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div> : <div>register</div>}
          </button>
          <div className=" flex items-center justify-between mt-6 ">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            <Link
              href={"/"}
              className="hover:underline text-gray-300 uppercase dark:text-gray-400 text-xs"
            >
              {" "}
              Do YOU HAVE AN ACCOUNT?{" "}
            </Link>
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
