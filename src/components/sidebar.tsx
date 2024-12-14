import React, { useEffect, useState } from "react"
import { Nav } from "./nav"
import {
  ChevronRight,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  UsersRound,
  UserRoundPen,
  Shirt,
  ChartBarStacked,
  Dribbble,
  MessageCircleMore
} from "lucide-react"

import { useWindowWidth } from "@react-hook/window-size"
import { Button } from "@/components/ui/button"

type Props = {}

export default function Sidebar({}: Props) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [isPending, setIsPending] = useState(true);

  const onlyWidth = useWindowWidth()
  const mobileWidth = onlyWidth < 768

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed)
  }

  useEffect(()=>{
    setTimeout(()=>{
      setIsPending(false)
    },400)
  },[])
  return (
    <>
    {!isPending && <div className='relative min-w-[80px] border-r px-3 pb-10 pt-24'>
      {!mobileWidth && (
        <div className='absolute right-[-20px] top-7'>
          <Button variant='secondary' className='rounded-full p-2' onClick={toggleSidebar}>
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/admin/dashboard",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Customers",
            href: "/admin/customers",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Staffs",
            href: "/admin/staffs",
            icon: UserRoundPen,
            variant: "ghost",
          },
          {
            title: "Products",
            href: "/admin/products",
            icon: Shirt,
            variant: "ghost",
          },
          {
            title: "Categories",
            href: "/admin/categories",
            icon: ChartBarStacked,
            variant: "ghost",
          },
          {
            title: "Orders",
            href: "/admin/orders",
            icon: ShoppingCart,
            variant: "ghost",
          },
          // {
          //   title: "Posts",
          //   href: "/admin/posts",
          //   icon: Dribbble,
          //   variant: "ghost",
          // },
          {
            title: "Chats",
            href: "/admin/chats",
            icon: MessageCircleMore,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "/admin/settings",
            icon: Settings,
            variant: "ghost",
          },
        ]}
      />
    </div>}
    </>
  )
}
