import { authApi } from "./api/authApi";
import { commonApi } from "./api/commonApi";
import { userApi } from "./api/userApi";

const apiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [commonApi.reducerPath]: commonApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
};

export default apiReducers;
