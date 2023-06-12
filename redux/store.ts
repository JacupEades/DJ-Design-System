import { configureStore } from "@reduxjs/toolkit";
import listSliceReducer from "./slices/listSlice";
import { combineReducers } from "redux";

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
	list: listSliceReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
