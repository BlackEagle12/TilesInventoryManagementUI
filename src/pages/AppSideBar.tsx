import { Package, PackageOpen, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button";
import { useGetPermissionsMutation } from "../redux/reducer/api/userApi";
import Loader from "../components/myComponents/Loader";
import { useEffect } from "react";

// Menu items.
const items = [
  {
    title: "Stocks",
    url: "/stocks",
    icon: Package,
  },
  {
    title: "Stocks Items",
    url: "/stock-items",
    icon: PackageOpen,
  },
  {
    title: "Users",
    url: "/users",
    icon: User,
  },
]

export function AppSidebar() {

  const navigate=useNavigate();

 
  const handleLogout=()=>{
    navigate('login')  
  }

  return (
    <Sidebar>
     
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Company Name</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
        <SidebarFooter className="mb-3">
          <Button type='button' onClick={handleLogout} >Log Out</Button>
        </SidebarFooter>
    </Sidebar>
  )
}
