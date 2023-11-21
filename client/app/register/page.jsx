"use client";

import { registerUser } from "@/services/registerUser";
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

  const navigate = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Agregar lógica para el registro aquí
    await registerUser(registerForm.email,registerForm.name,registerForm.password,registerForm.phone);

    navigate.push("/");
  };

  const handleFormChange = ({target}) => {
    setRegisterForm(prev => ({...prev, [target.name]: target.value}))
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
          </div>
          <button
            type="submit"
            className="bg-[#0ed3cf] hover:bg-[rgba(14,211,208,0.63)] text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Register
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
