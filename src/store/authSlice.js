import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import notify from "../utils/notify";

const url = "https://10001.fullstack.clarusway.com";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: sessionStorage.getItem("username") || false,
    token:
      sessionStorage.getItem("token") &&
      window.atob(sessionStorage.getItem("token")),
  },
  reducers: {
    auth(state, action) {
      state.currentUser = action.payload.username;
      state.token = action.payload.token;
    },
  },
});

export const login = (userInfo, navigate) => {
  return async(dispatch) => {
    try{
      console.log(userInfo)
       const res = await axios.post(`${url}/account/auth/login/`, userInfo);
       console.log(res)
       if(!res.data.key) throw new Error("Something went Wrong !");
       const payload = {token: res.data.key, username: res.data.user.username}
       dispatch(authSlice.actions.auth(payload))
         //   Store the token and user info in session storage
      sessionStorage.setItem("username", res.data.user.username);
      sessionStorage.setItem("token", window.btoa(res.data.key));
      sessionStorage.setItem('admin', res.data.user.is_superuser)
      notify("User Logged in successfully", "success");
      navigate("/stock/dashboard");
    }catch(err){
        console.log(err);
        notify(err.response.request.response, "error");
    }
  };
};

export const register = (userInfo, navigate) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${url}/account/register/`, userInfo);
      if (!res.data.token) throw new Error("Something went Wrong !");
      // Update the auth state
      const payload = { token: res.data.token, username: res.data.username };
      dispatch(authSlice.actions.auth(payload));
      //   Store the token and user info in session storage
      sessionStorage.setItem("username", res.data.username);
      sessionStorage.setItem("token", window.btoa(res.data.token));
      notify("User registered successfully", "success");
      navigate("/stock/dashboard");
    } catch (err) {
      console.log(err);
      notify(err.message, "error");
    }
  };
};

export const logout = (navigate) => {

  return async(dispatch)=>{
    try{
      const token = window.atob(sessionStorage.getItem('token'))
      const options = {
        method:'post', 
        url:`${url}/account/auth/logout/`, 
        headers: {'Authorization':`Token ${token}`}
      }

      const res = await axios(options)
      if(res.status ===200){
        dispatch(authSlice.actions.auth({token: false, username: false}))
        sessionStorage.clear();
        notify('User successfully Logged out!', 'success');
        navigate('/')
      }
    }catch(err){
      console.log(err);
      notify(err.message, "error"); 
    }
  }
};

export default authSlice.reducer;
