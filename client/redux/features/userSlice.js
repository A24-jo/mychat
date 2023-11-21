import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  userData: {}
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    postUserData: (state, action) => {
      state.userData = action.payload
    }
  }
});

export const {postUserData} = userSlice.actions;

export default userSlice.reducer;
