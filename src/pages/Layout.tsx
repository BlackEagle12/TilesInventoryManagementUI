import  { FC, useEffect } from "react";
import Header from "./Header";
import {
  SidebarProvider,
} from "../components/ui/sidebar";
import { AppSidebar } from "./AppSideBar";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Header />
        <div className=" h-[calc(100vh-36px)] pb-9 overflow-auto">
           <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
