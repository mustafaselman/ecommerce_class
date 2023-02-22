//// giriş yapan kullanıcı bilgisini yöneten redux
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn : false,
  email : null,
  userName : null,
  userID: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
    // aktif kullanıcıyı kaydetmek için kullanacağız
    SET_ACTIVE_USER: (state,action) => {
      const {email, userName, userID} = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userID = userID;
      // console.log(action.payload)
    },
    // kullanıcı çıkış yaptığında reduxdaki bilgileri sıfırlamak için kullanacağız
    REMOVE_ACTIVE_USER(state,action) {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userID = null;
      // console.log(state.isLoggedIn)
  }
    
  }
});

export const {SET_ACTIVE_USER,REMOVE_ACTIVE_USER} = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectEmail = (state) => state.auth.email 
export const selectUserName = (state) => state.auth.userName
export const selectUserID = (state) => state.auth.userID

export default authSlice.reducer