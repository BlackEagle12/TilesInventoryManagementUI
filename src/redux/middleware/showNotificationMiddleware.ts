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
      const errorMessage = action.payload?.data?.errorMessage;
      console.log({errorMessage});
      if (typeof errorMessage === "string") {
        storeAPI.dispatch(errorNotification(errorMessage));
    }
  } else if (action.type.endsWith("/fulfilled")) {
    const successMessage = action.payload?.data?.message || action.payload?.data;
    if (typeof successMessage === "string") {
      storeAPI.dispatch(successNotification(successMessage));
    }
  }

  return next(action);
};