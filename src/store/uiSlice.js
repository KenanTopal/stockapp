import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name:'ui',
  initialState:{sidebarOpen : false, modelOpen: false, modalData: {}},
  reducers:{
    toggleMenu(state){
      state.sidebarOpen = !state.sidebarOpen
    },
    openModal(state){
      state.modalOpen = true;
    },
    closeModal(state){
      state.modalOpen = false;
    },
    setModalData(state, action){
      state.modalData = action.payload
    }
  }
})


const uiReducer = uiSlice.reducer;
const uiActions = uiSlice.actions;

export {uiReducer, uiActions}