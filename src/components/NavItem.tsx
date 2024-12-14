import { Popover, Transition } from "@headlessui/react"
import type { FC, ReactNode } from "react"
import { Fragment, useState } from "react"
import { IoMdArrowDropdown } from "react-icons/io"
import { Link } from "react-router-dom"

export interface NavItemType {
  id: string
  name: string
  href?: any
  targetBlank?: boolean
  type?: "dropdown" | "megaMenu" | "none"
  isNew?: boolean
}

export interface NavigationItemProps {
  children?: ReactNode
  menuItem: NavItemType
  changeWidth?: boolean
}

const NavigationItem: FC<NavigationItemProps> = ({ menuItem, children, changeWidth }) => {
  const [menuCurrentHovers, setMenuCurrentHovers] = useState<string[]>([])

  const onMouseEnterMenu = (id: string) => {
    setMenuCurrentHovers((state) => [...state, id])
  }

  const onMouseLeaveMenu = (id: string) => {
    setMenuCurrentHovers((state) => {
      return state.filter((item, index) => {
        return item !== id && index < state.indexOf(id)
      })
    })
  }

  const renderMainItem = (item: NavItemType) => {
    return (
      <div className='mx-3 flex shrink-0 items-center font-semibold hover:text-primary'>
        <Link className='inline-flex list-none items-center justify-center gap-1' to={`/collections/${item.id}`}>
          {item.name}
          {item.type === "dropdown" && <IoMdArrowDropdown />}
        </Link>
      </div>
    )
  }

  // ===================== MENU DROPDOW =====================
  const renderDropdownMenu = (menuDropdown: NavItemType) => {
    const isHover = menuCurrentHovers.includes(`${menuDropdown.id}`)
    return (
      <Popover
        as='li'
        className='menu-item menu-dropdown relative list-none'
        onMouseEnter={() => onMouseEnterMenu(`${menuDropdown.id}`)}
        onMouseLeave={() => onMouseLeaveMenu(`${menuDropdown.id}`)}
      >
        {() => (
          <>
            <Popover.Button as={Fragment}>{renderMainItem(menuDropdown)}</Popover.Button>
            <Transition
              as={Fragment}
              show={isHover}
              enter='transition ease-out duration-150'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'
            >
              <Popover.Panel
                static
                className={`sub-menu absolute z-10 ${changeWidth ? "w-[670px]" : "w-[300px]"} left-0 top-full`}
              >
                <div className='relative pt-4 shadow'>{children}</div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    )
  }

  switch (menuItem.type) {
    case "dropdown":
      return renderDropdownMenu(menuItem)
    case "megaMenu":
      return null
    default:
      return <li className='menu-item shrink-0 list-none'>{renderMainItem(menuItem)}</li>
  }
}

export default NavigationItem