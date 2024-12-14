import { RiSearch2Line } from "react-icons/ri"

import Input from "@/shared/Input/Input"
import Logo from "@/components/icon/logo"

import CartSideBar from "../CartSideBar"
import Countries from "../Countries"
import Language from "../Language"
import UserAccount from "../UserAccount"
import CatalogBar from "./CatalogBar"
import MenuBar from "./MenuBar"
import { Link } from "react-router-dom"
import SearchText from "@/components/Header/SearchText"

interface INavItem {
  name: string
  href: string
}

const MainNav = () => {
  const navItems: INavItem[] = [
    {
      name: "Catalog",
      href: "/collections",
    },
    {
      name: "Products",
      href: "/products",
    },
    {
      name: "Blogs",
      href: "/blogs/news",
    },
  ]
  return (
    <div className='container  '>
      <div className='flex items-center justify-between gap-6 py-3 lg:py-4'>
        <div className=' xl:hidden'>
          <MenuBar />
        </div>
        <div className='relative flex items-center gap-5 xl:grow'>
          <Link to='/' className='relative flex items-center gap-5 xl:grow'>
            <Logo width={70} />
            <h1 className='scroll-m-20 text-xl font-extrabold tracking-tight lg:text-3xl'>Shop3Man</h1>
          </Link>
          <CatalogBar className='hidden xl:inline-block' />
          <SearchText />
        </div>

        <div className='flex items-center justify-end gap-4'>
          <div className='hidden  xl:block'>
            <ul className='flex'>
              {navItems.map((navItem, index) => (
                <li
                  key={index}
                  className='p-3 text-sm text-neutral-500 hover:font-semibold hover:text-neutral-800 dark:text-neutral-300  dark:hover:text-neutral-100'
                >
                  <Link to={navItem.href}>{navItem.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex items-center'>
            <div className='hidden lg:inline-block'>
              <Countries />
            </div>
            <div className='hidden lg:inline-block'>
              <Language />
            </div>
            <div className='hidden lg:inline-block'>
              <UserAccount />
            </div>
            {location.pathname === "/cart" ? <></> : <CartSideBar />}
          </div>
        </div>
      </div>
      <div className='pb-2 xl:hidden'>
        <div className='flex w-full items-center gap-5 border border-neutral-300 bg-white pr-3 dark:bg-neutral-950'>
          <Input
            type='text'
            className='border-transparent placeholder:text-neutral-500 focus:border-transparent'
            placeholder='What are you looking for ...'
          />
          <RiSearch2Line className='text-2xl text-neutral-500' />
        </div>
      </div>
    </div>
  )
}

export default MainNav
