"use client";
import { postUserData } from "@/redux/features/userSlice";
import { loginUser } from "@/services/loginUser";
import { setLocalStorageItems } from "@/utils/helpers";
import LoginValid from "@/utils/loginValidate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch()
  const navigate = useRouter();

  const [loginStates, setLoginStates] = useState({
    email: "",
    password: "",
  });

  const [loginValidate, setLoginValidate] = useState({
    email: false,
    password: false,
    phone: false,
  });

  const [lowding, setLowding] = useState(false);

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    
     const datas =  LoginValid(loginStates.password, loginStates.email, setLoginValidate, loginValidate);
     if(datas === "error") return;
      setLowding(true);
    const res = await loginUser({
      email: loginStates.email,
      phone: loginStates.email,
      password: loginStates.password
    })
    if (res.error) {
      setLowding(false)
      alert("fallo el login");
      return
    }
    dispatch(postUserData(res.user))
    setLocalStorageItems("user_token", res.token)
    setLocalStorageItems("user_data", JSON.stringify(res.user))
   
    return navigate.push("/home");
  };

  const handleInputChange = (e) => {
    setLoginStates((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-black flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://tailwindcomponents.com/svg/secure-login-animate.svg"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300">Email/Phone</label>
            <input
              type="text"
              name="email"
              id="username"
              value={loginStates.email}
              onChange={handleInputChange}
              className="w-full border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400 bg-black text-white "
            />
            {loginValidate.email && <label className="block text-gray-300">"El formato del correo electrónico no es válido."</label>}
            {loginValidate.phone && <label className="block text-gray-300">"El formato del número de teléfono no es válido."</label>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={loginStates.password}
              onChange={handleInputChange}
              className="w-full border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400 bg-black text-white "
            />
            {loginValidate.password && <label className="block text-gray-300">"La contraseña debe tener al menos 8 caracteres."</label>}
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="text-blue-500"
            />
            <label className="text-gray-600 ml-2">Remember Me</label>
          </div>
          <div className="mb-6 text-yellow-50">
            <a className="hover:underline">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="bg-[#0ed3cf] hover:bg-[#68cecc] text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            {lowding ? <div className="flex justify-center py-2 px-4 w-full ">
              <div className="flex flex-row gap-2 ">
                <div className="w-2 h-2 rounded-full bg-slate-800 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-slate-800 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-2 h-2 rounded-full bg-slate-800 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div> : <div>Login</div>}
          </button>
        </form>
        <div className=" flex items-center justify-between mt-6 ">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          <Link
            href={"/register"}
            className="hover:underline text-gray-200 uppercase dark:text-gray-400 text-xs"
          >
            SING UP HERE
          </Link>
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </div>
    </div>
  );
}
