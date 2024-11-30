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

// Menu items.
const items = [
  {
    title: "Stocks",
    url: "/stocks",
    icon: PackageOpen,
    permissionName:"VIEW_INVENTORY_STOCK"
  },
  {
    title: "Inventory Items",
    url: "/stock-items",
    icon: Package,
    permissionName:"VIEW_INVENTORY_LIST"
  },
  {
    title: "Users",
    url: "/users",
    icon: User,
    permissionName:"VIEW_USER_LIST"
  },
]

interface props{
  permissionList:string[]
}

export function AppSidebar({permissionList=[]}:props) {

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
                permissionList.includes(item.permissionName) && 
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
