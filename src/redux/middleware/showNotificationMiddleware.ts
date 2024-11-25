import { Middleware } from "@reduxjs/toolkit";
import { errorNotification, successNotification } from "../reducer/slice/commonAction";

interface Action {
  type: string;
  payload?: {
    data?: {
      error?: string;
      message?: string;
    };
  };
}

export const showNotificationMiddleware: Middleware = (storeAPI) => (next) => 
  (action: Action) => {
  if (action.type.endsWith("/rejected")) {
    const errorMessage = action.payload?.data?.message;
    if (typeof errorMessage === "string" && errorMessage.length > 0) {
      storeAPI.dispatch(errorNotification(errorMessage));
    }
  } else if (action.type.endsWith("/fulfilled")) {
    const successMessage = action.payload?.data?.message || action.payload?.data;
    if (typeof successMessage === "string" && successMessage.length > 0) {
      storeAPI.dispatch(successNotification(successMessage));
    }
  }

  return next(action);
};