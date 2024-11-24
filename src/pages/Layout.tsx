import  { FC, useEffect } from "react";
import Header from "./Header";
import {
  SidebarProvider,
} from "../components/ui/sidebar";
import { AppSidebar } from "./AppSideBar";
import { Outlet } from "react-router-dom";
import { useSelector, useStore } from "react-redux";
import { toast, useToast } from "../hooks/use-toast";

const Layout: FC = () => {

  const notification= useSelector(state=>state.notification);

  const {toast} = useToast();

  console.log('notification',notification);
  
  useEffect(()=>{
    if(notification.message){
      toast({
        title:notification.message,
        variant:notification.type=="error" ? 'destructive' :notification.type=='success' ? "success" : ""
      })
    }
  },[notification])

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
