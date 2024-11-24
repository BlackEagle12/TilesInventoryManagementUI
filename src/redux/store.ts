import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import middleWares from "./middleware/middleware";
import rootReducer from "./reducer";

export const store: EnhancedStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleWares),
});
setupListeners(store.dispatch);