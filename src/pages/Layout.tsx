import  { FC, useEffect } from "react";
import Header from "./Header";
import {
  SidebarProvider,
} from "../components/ui/sidebar";
import { AppSidebar } from "./AppSideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetPermissionsMutation } from "../redux/reducer/api/userApi";
import Loader from "../components/myComponents/Loader";

const Layout: FC = () => {

  const navigate = useNavigate();

  const [getPermissions,{data:permissionList,isLoading,isSuccess}]=useGetPermissionsMutation();

  useEffect(()=>{
    getPermissions({});
  },[]);

    
  useEffect(()=>{
    isSuccess && navigate('/stocks');
  },[isSuccess]);

  if(isLoading){
    return (<div className='w-100 h-100'>
    {
     isLoading && <Loader />
   }
 </div>);
  }

  return (
    <SidebarProvider>
      <AppSidebar permissionList={permissionList} />
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
