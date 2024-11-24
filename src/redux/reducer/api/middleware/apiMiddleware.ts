import { Middleware } from "@reduxjs/toolkit";
import { authApi } from "../authApi";
import { commonApi } from "../commonApi";
import { userApi } from "../userApi";

const apiMiddleWares: Middleware[] = [authApi.middleware,commonApi.middleware,userApi.middleware];

export default apiMiddleWares;
