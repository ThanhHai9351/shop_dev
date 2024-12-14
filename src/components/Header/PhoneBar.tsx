import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment, useEffect, useState } from "react"
import { IoMdArrowDropdown } from "react-icons/io"

import banner_2 from "@/images/Group_103-1.webp"
import banner_1 from "@/images/phone_2.webp"
import Button from "@/shared/Button/Button"
import ButtonPrimary from "@/shared/Button/ButtonPrimary"
import { Link } from "react-router-dom"
import { IProduct } from "@/lib/types"
import { getProductsFromCategoryId } from "@/services/product-service"

export interface CartSideBarProps {}

const PhoneBar: React.FC<CartSideBarProps> = () => {
  const [productsPhone, setProductsPhone] = useState<IProduct[] | null>(null)
  const [productsWatch, setProductsWatch] = useState<IProduct[] | null>(null)
  const [isVisable, setIsVisable] = useState(false)

  const handleOpenMenu = () => setIsVisable(true)
  const handleCloseMenu = () => setIsVisable(false)

  // useEffect(() => {
  //   const getData = async () => {
  //     const phones = await getProductsFromCategoryId(DataCategoryId.phone, 6)
  //     setProductsPhone(phones)

  //     const watchs = await getProductsFromCategoryId(DataCategoryId.smartwatch, 6)
  //     setProductsWatch(watchs)
  //   }
  //   getData()
  // }, [])

  const renderContent = () => {
    return (
      <Transition appear show={isVisable} as={Fragment}>
        <Dialog as='div' className='absolute inset-0 top-[189px] z-50 overflow-y-auto' onClose={handleCloseMenu}>
          <div className='z-max absolute inset-y-0 right-0 w-full outline-none focus:outline-none'>
            <Transition.Child
              as={Fragment}
              enter='transition duration-100 transform'
              enterFrom='opacity-0 translate-x-full'
              enterTo='opacity-100 translate-x-0'
              leave='transition duration-150 transform'
              leaveFrom='opacity-100 translate-x-0'
              leaveTo='opacity-0 translate-x-full'
            >
              <div className='relative z-20 mt-10'>
                <div className='overflow-hidden bg-white shadow-lg ring-1 ring-black/5 dark:bg-neutral-950 p-10'>
                  <div className='container relative w-full py-10'>
                    <div className='hiddenScrollbar overflow-y-auto py-5'>
                      <span className='text-xs text-neutral-500'>PHONES & SMART WATCHES</span>
                      <div className='grid grid-cols-12 gap-3'>
                        <div className='col-span-2'>
                          <h4 className='mb-2 font-semibold'>Phones</h4>
                          <div className='space-y-2 text-neutral-500 dark:text-neutral-300'>
                            {productsPhone &&
                              productsPhone.map((phone, index) => (
                                <div key={index}>
                                  <Link to={`/products/${phone.id}`} className='font-medium hover:text-primary'>
                                    {phone.name}
                                  </Link>
                                </div>
                              ))}
                          </div>
                        </div>

                        <div className='col-span-2'>
                          <h4 className='mb-2 font-semibold'>Smart Watches</h4>
                          <div className='space-y-2 text-neutral-500 dark:text-neutral-300'>

                            {productsWatch &&
                              productsWatch.map((watch, index) => (
                                <div key={index}>
                                  <Link to={`/products/${watch.id}`} className='font-medium hover:text-primary'>
                                    {watch.name}
                                  </Link>
                                </div>
                              ))}
                          </div>
                        </div>

                        <div className='col-span-4'>
                          <div className='relative aspect-[8/5] overflow-hidden rounded-md p-6'>
                            <div className='absolute left-0 top-0 size-full'>
                              <img
                                src={banner_2}
                                alt='bg-graphic'
                                className='scale-105 object-cover object-center transition-transform duration-700 group-hover:scale-100 dark:opacity-50'
                              />
                            </div>
                            <div className='relative z-20 flex flex-col justify-center'>
                              <h4 className='w-3/5 font-semibold'>Nova N-s5 is Already Here.</h4>
                              <div className='mt-8'>
                                <p className='mb-3'>
                                  from: <span className='text-lg font-semibold text-primary dark:text-white'>$15</span>
                                </p>
                                <ButtonPrimary href='/products' showPointer>
                                  Shop Now
                                </ButtonPrimary>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='col-span-4'>
                          <div className='relative aspect-[8/5] overflow-hidden rounded-md p-6'>
                            <div className='absolute left-0 top-0 size-full'>
                              <img
                                src={banner_1}
                                alt='bg-graphic'
                                className='scale-105 object-cover object-center transition-transform duration-700 group-hover:scale-100 dark:opacity-50'
                              />
                            </div>
                            <div className='relative z-20 flex h-full flex-col justify-center'>
                              <h4 className='w-3/5 font-semibold'>Hyperion HX-1</h4>
                              <div className='mt-8'>
                                <p className='mb-3'>
                                  from: <span className='text-lg font-semibold text-primary dark:text-white'>$15</span>
                                </p>
                                <ButtonPrimary href='/products' showPointer>
                                  Shop Now
                                </ButtonPrimary>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    )
  }

  return (
    <>
      <Button onClick={handleOpenMenu} sizeClass='' className='text-base hover:text-primary'>
        Phones
        <IoMdArrowDropdown />
      </Button>

      {renderContent()}
    </>
  )
}

export default PhoneBar
