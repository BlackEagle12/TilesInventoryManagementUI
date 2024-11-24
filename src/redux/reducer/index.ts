import { combineReducers } from "@reduxjs/toolkit";
import apiReducers from "./apiReducer";
import sliceReducers from "./sliceReducer";

const rootReducer = combineReducers({ ...apiReducers, ...sliceReducers });
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
