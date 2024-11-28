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
      console.log('message', action.payload);
      const errorMessage = action.payload?.data?.ErrorMessage;
      console.log({errorMessage});
      if (typeof errorMessage === "string") {
        storeAPI.dispatch(errorNotification(errorMessage));
    }
  } else if (action.type.endsWith("/fulfilled")) {
    const successMessage = action.payload?.message || action.payload?.data;
    console.log({successMessage});

    if (typeof successMessage === "string") {
      storeAPI.dispatch(successNotification(successMessage));
    }
  }

  return next(action);
};