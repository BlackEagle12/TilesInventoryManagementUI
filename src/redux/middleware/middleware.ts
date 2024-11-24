import { Middleware } from "@reduxjs/toolkit";
// import { showNotificationMiddleware } from "./showNotificationMiddleware";
import apiMiddleWares from "../reducer/api/middleware/apiMiddleware";
import { authMiddleware } from "./authMiddleware";
import { showNotificationMiddleware } from "./showNotificationMiddleware";

const middleWares: Middleware[] = [...apiMiddleWares,authMiddleware,showNotificationMiddleware];
export default middleWares;