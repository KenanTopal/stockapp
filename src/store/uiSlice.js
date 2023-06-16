import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { 
    sidebarOpen: false, 
    modalOpen: false, 
    modalData: {}, 
    filterCategory: 'choose', 
    filteredData: [], 
    field:'', 
    showSort:false, 
    sort:'default'
},
  reducers: {
    toggleMenu(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleSort(state){
        state.showSort = !state.showSort;
    },
    openModal(state) {
      state.modalOpen = true;
    },
    closeModal(state) {
      state.modalOpen = false;
    },
    setModalData(state, action) {
      state.modalData = action.payload;
    },
    setFilterData(state, action){
        state.filteredData = action.payload
    }, 
    setFilterCategory(state, action){
        state.filterCategory = action.payload;
    }, 
    setField(state, action){
        state.field = action.payload
    }, 
    setSort (state, action){
        state.sort = action.payload
    }
  },
});

const uiReducer = uiSlice.reducer;
const uiActions = uiSlice.actions;
export { uiReducer, uiActions };