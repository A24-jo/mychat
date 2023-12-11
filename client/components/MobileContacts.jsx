"use client"
import Contacts from "./Contacts";
import { FaRegUser } from "react-icons/fa";

const MobileContacts = () => {

    return (
        <div className="w-full h-full">
            <div className="bg-[#0ed3cf] p-4">
                <div className="flex flex-col">
                    {/* Avatar del dueño de la cuenta (clickeable) */}
                    <div className="flex items-center justify-between">
                        {/*mi avatr*/}

                        <div className="w-12 h-12 dark:bg-slate-800  bg-white rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 text-xl font-semibold" >
                            <FaRegUser />
                        </div>

                        <div className="flex justify-between gap-4">
                            <div className="text-slate-700 font-semibold dark:text-slate-100" >CHATS </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" p-3 border-b-2 dark:border-gray-500 ">
                <input
                    type="text"
                    placeholder="Buscar en chats..."
                    className="flex-auto py-1 px-4 rounded-2xl border border-gray-300 focus:outline-non"
                />
            </div>
            <div className="overflow-y-auto max-h-[700px] ">
                <Contacts />
            </div>

        </div>
    )

}

export default MobileContacts;