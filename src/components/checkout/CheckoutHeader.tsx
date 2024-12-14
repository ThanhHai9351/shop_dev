import Logo from "@/components/icon/logo"
import React from "react"
import { CiShoppingCart } from "react-icons/ci"
import { Link } from "react-router-dom"

const CheckoutHeader = () => {
  return (
    <nav className='border-b border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900 px-3'>
      <div className='container'>
        <div className='flex items-center justify-between py-5'>
          <Link to='/' className='relative flex items-center gap-5 xl:grow'>
            <div className='relative flex items-center gap-5 xl:grow'>
              <Logo width={50} />
              <h1 className='scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl'>Shop3Man</h1>
            </div>
          </Link>
          {/* <div>
            <CiShoppingCart size={24} />
          </div> */}
        </div>
      </div>
    </nav>
  )
}

export default CheckoutHeader
