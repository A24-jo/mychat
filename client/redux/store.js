"use client"
import chat from "./features/chatSlice";
import user from "./features/userSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{
        chat,
        user
    }
})  