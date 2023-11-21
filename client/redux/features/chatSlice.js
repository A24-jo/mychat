import { Axios } from "@/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllChats = createAsyncThunk(
  "appChats/getAllChats",
  async (_, { dispatch, getState }) => {
    const userId = getState("user_data")

    const { data } = await Axios.get(`user/get_all_users/${userId.user.userData.userId}`);
    return {
      chats: data,
    };
  }
);

export const getAllContacts = createAsyncThunk(
  "appChats/getAllContacts",
  async (_, { dispatch, getState }) => {
    const userId = getState("user_data")
    const { data } = await Axios.get(`contacts/get-all-contacts/${userId.user.userData.userId}`);
    return {
      contacts: data,
    };
  }
);

const initialState = {
  chats: [],
  messages: [],
  contacts: [],
  userProfile: {},
  selectedUser: {},
  messagesNew:[],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload
    },
    setNewMessage: (state, action) => {
      if (action.payload.sent) {
        return;
      }
      if(action.payload){
        action.payload.sent = true;
        state.messages = [...state.messages,action.payload]
      }
    },
    notificationss: (state, action) => {
      if (action.payload.sent) {
        return;
      }
      if(action.payload){
        action.payload.sent = true;
        state.messagesNew = [...state.messagesNew,action.payload]
      }
    },
    resetMessagesOrUpdate: ( state, action )=>{
      state.messages = action.payload;
    },
    NewNotificate: ( state, action )=>{
      state.messagesNew = action.payload;
    },
    formtContact:(state, action)=>{
      state.messagesNew = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllChats.fulfilled, (state, action) => {
        state.chats = action.payload.chats;
      })
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.contacts = action.payload.contacts;
      });
  },
});

export const { setSelectedUser , setNewMessage, resetMessagesOrUpdate,NewNotificate ,formtContact,notificationss} = chatSlice.actions;
export default chatSlice.reducer;
