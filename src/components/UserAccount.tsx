import { Menu, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import { RiUser6Line } from "react-icons/ri"

import ButtonPrimary from "@/shared/Button/ButtonPrimary"
import { Link, NavLink } from "react-router-dom"
import { IUser } from "@/lib/types"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { getMe } from "@/services/user-service"
import { Button } from "@/components/ui/button"

const UserAccount = () => {
  const accessToken = localStorage.getItem("accessToken")
  const [user, setUser] = useState<IUser | null>(null)
  useEffect(() => {
    const getUser = async () => {
      const dataUser = await getMe()
      setUser(dataUser)
    }
    if (accessToken !== null) {
      getUser()
    }
  }, [accessToken])

  const handleLogoutAccount = () => {
    localStorage.removeItem("accessToken")
    setUser(null)
  }
  return (
    <div className='pt-1 font-medium'>
      <Menu as='div' className='relative inline-block'>
        <Menu.Button className='flex items-center gap-1 text-sm'>
          <span className='flex items-center justify-center'>
            <RiUser6Line className='' size={18} />
          </span>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='divide-gray-100 absolute right-0 mt-2 w-52 origin-top-right divide-y rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-neutral-900'>
            <div className='flex flex-col p-6'>
              {user === null ? (
                <>
                  <ButtonPrimary href='/account/login'>
                    <RiUser6Line className='' size={18} />
                    <span>Log In</span>
                  </ButtonPrimary>
                  <NavLink to='/account/register' className='mt-2 text-center'>
                    <span>Create Account</span>
                  </NavLink>
                </>
              ) : (
                <div className=" bg-white rounded-lg  text-center max-w-sm mx-auto">
                {/* Avatar Section */}
                <div className="mb-4">
                  <Avatar className="mx-auto w-24 h-24">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                      className="rounded-full border-2 border-gray-300"
                    />
                    <AvatarFallback className="bg-gray-200 text-gray-700">CN</AvatarFallback>
                  </Avatar>
                </div>
              
                {/* User Greeting */}
                <p className="text-lg font-semibold text-gray-700 flex">
                  Hello, <span className="text-blue-500 mx-2">{user.lastName}</span>
                </p>
              
                {/* Navigation Links */}
                <div className="mt-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    <Link to="/me/profile">
                      <li className="p-3 text-sm font-medium text-gray-700 hover:bg-blue-100 cursor-pointer transition duration-300">
                        Profile
                      </li>
                    </Link>
                    <Link to="/me/cart">
                      <li className="p-3 text-sm font-medium text-gray-700 hover:bg-blue-100 cursor-pointer transition duration-300">
                        My Cart
                      </li>
                    </Link>
                    <Link to="/me/whistlist">
                      <li className="p-3 text-sm font-medium text-gray-700 hover:bg-blue-100 cursor-pointer transition duration-300">
                        Wishlist
                      </li>
                    </Link>
                  </ul>
                </div>
              
                {/* Logout Button */}
                <Button
                  onClick={handleLogoutAccount}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                  variant={"destructive"}
                >
                  Logout
                </Button>
              </div>
              
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default UserAccount
