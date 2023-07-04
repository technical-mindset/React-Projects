import { combineReducers, configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import ulistReducer from "./ulistSlice";
import userReducer from "./userSlice";
import loadReducer from './loadingSlice';
import chatIdReducer from './chatIdSlice';
import thunk from "redux-thunk";



let reducers = combineReducers({
    chat: chatReducer,
    chatId: chatIdReducer,
    ulist: ulistReducer,
    user: userReducer,
    loading: loadReducer,
})


const store = configureStore({
    reducer: reducers,
    middleware: [thunk],


});


export default store;