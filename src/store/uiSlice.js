import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name:'ui',
  initialState:{sidebarOpen : false},
  reducers:{
    toggleMenu(state){
      state.sidebarOpen = !state.sidebarOpen
    }
  }
})


const uiReducer = uiSlice.reducer;
const uiActions = uiSlice.actions;

export {uiReducer, uiActions}