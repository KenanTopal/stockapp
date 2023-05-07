import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import { uiReducer } from "./uiSlice";
import { stockReducer } from "./stock/stockSlice";

const store = configureStore({reducer:{auth: authReducer, ui: uiReducer, stock:stockReducer}});

export default store ;