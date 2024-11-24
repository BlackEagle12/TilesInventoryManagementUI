import { createBrowserRouter, RouteObject } from "react-router-dom";
import { RegistrationFormComponent } from "./pages/Registration/RegistrationFormComponent";
import Layout from "./pages/Layout";
import Stocks from "./pages/Stocks/Stocks";
import StockItems from "./pages/StockItems/StockItems";
import Login from "./pages/Login/Login";
import ErrorPage from "./pages/Error-Page/ErrorPage";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

export const routerObjects: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path:"/stocks",
        element:<Stocks />
      },
      {
        path:"/stock-items",
        element:<StockItems />
      }
    ]
  },
  {
    path:'/registration',
    element:<RegistrationFormComponent/>
  },
  {
    path:"/login",
    element:<Login />
  },
  {
    path:'/forgot-password',
    element:<ForgotPassword />
  }
];

export function createRouter(): ReturnType<typeof createBrowserRouter> {
  const routeWrappers = routerObjects.map((router) => {
    // @ts-ignore TODO: better type support
    return {
      ...router,
      element: router.element,
      ErrorBoundary: ErrorPage,
    };
  });
  return createBrowserRouter(routeWrappers);
}