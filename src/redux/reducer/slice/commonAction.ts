import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface INotification {
  type: "error" | "none" | "success" | "warning" | "info" | "clear";
  message: string;
}

const initialState = {
  notification: {
    type: "clear",
    message: "",
  } as INotification,
};

const commonAction = createSlice({
  name: "common",
  initialState,
  reducers: {
    successNotification(state, action: PayloadAction<string>) {
      const notification: INotification = {
        type: "success",
        message: action.payload,
      };
      state.notification = notification;
    },
    errorNotification(state, action: PayloadAction<string>) {
      const notification: INotification = {
        type: "error",
        message: action.payload,
      };
      state.notification = notification;
    },
    clearNotification(state) {
      const notification: INotification = {
        type: "clear",
        message: "",
      };
      state.notification = notification;
    },
  },
});

export const { errorNotification, successNotification, clearNotification } = commonAction.actions;
export default commonAction;
