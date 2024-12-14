import React, { useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { CiShoppingCart } from "react-icons/ci"
import { MdClose } from "react-icons/md"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { useCart } from "@/context/CartContext"
import authorizedAxiosInstance from "@/utils/authorizedAxios"
import { configs } from "@/lib/config"
import Subtotal from "@/pages/user/cart/subtotal"
import CartQuantityHandler from "./CartQuantityHandler"
import ButtonPrimary from "@/shared/Button/ButtonPrimary"
import ButtonSecondary from "@/shared/Button/ButtonSecondary"
import ButtonCircle3 from "@/shared/Button/ButtonCircle3"
import ButtonLink from "@/shared/Button/ButtonLink"
import { formatPrice } from "@/helpers/formatPrice"

const CartSideBar: React.FC = () => {
  const [isVisable, setIsVisable] = useState(false)
  const { carts, fetchCart } = useCart()

  const handleOpenMenu = () => setIsVisable(true)
  const handleCloseMenu = () => setIsVisable(false)

  const handleRemoveItem = async (id: string) => {
    try {
      const response = await authorizedAxiosInstance.patch(`${configs.host}/carts/current-customer/remove-items`, {
        cartItemIds: [id],
      })

      if (response.status === 200) {
        fetchCart()
        toast.success("Item removed successfully")
      }
    } catch (error) {
      console.error("Failed to remove item:", error)
    }
  }

  const renderProduct = (item: any, index: number) => {
    const { id, product, quantity } = item
    return (
      <div key={index} className='flex gap-5 py-5 last:pb-0'>
        <div className='relative size-16 shrink-0 overflow-hidden rounded-xl'>
          <img src={product.imageUrl} alt={product.name} className='size-full object-contain object-center h-full' />
          <Link onClick={handleCloseMenu} className='absolute inset-0' to={`/products/${product.id}`} />
        </div>

        <div className='ml-4 flex flex-1 flex-col gap-1'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='line-clamp-1 text-ellipsis font-medium'>
                <Link onClick={handleCloseMenu} to={`/products/${product.id}`}>
                  {product.name}
                </Link>
              </h3>
              <span className='font-medium'>{formatPrice(product.price)}</span>
            </div>
            <CartQuantityHandler
              initialQuantity={quantity}
              productId={product.id}
              getCart={fetchCart}
              className='h-10'
            />
          </div>
          <div className='flex w-full items-end justify-between text-sm'>
            <span className='text-gray'>storage: 128GB</span>
            <ButtonLink onClick={() => handleRemoveItem(id)}>Remove</ButtonLink>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <button
        type='button'
        onClick={handleOpenMenu}
        className='relative mx-5 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
      >
        <span className='absolute -top-1/4 left-3/4 inline-block aspect-square size-4 rounded-full bg-primary text-[10px] text-white'>
          {carts.length}
        </span>
        <CiShoppingCart size={24} />
      </button>

      <Transition appear show={isVisable} as={React.Fragment}>
        <Dialog as='div' className='fixed inset-0 z-50 overflow-y-auto' onClose={handleCloseMenu}>
          <div className='z-max fixed inset-y-5 right-5 w-full max-w-md outline-none focus:outline-none md:max-w-[486px]'>
            <Transition.Child
              as={React.Fragment}
              enter='transition duration-100 transform'
              enterFrom='opacity-0 translate-x-full'
              enterTo='opacity-100 translate-x-0'
              leave='transition duration-150 transform'
              leaveFrom='opacity-100 translate-x-0'
              leaveTo='opacity-0 translate-x-full'
            >
              <div className='relative z-20 h-full'>
                <div className='h-full overflow-hidden shadow-lg ring-1 ring-black/5'>
                  <div className='relative h-full rounded-md bg-white dark:bg-gray'>
                    <div className='hiddenScrollbar h-full overflow-y-auto p-5'>
                      <div className='flex items-center justify-between'>
                        <h3 className='text-4xl font-semibold'>
                          Cart
                          <div className='text-sm font-bold mt-3'>Total items: {carts.length}</div>
                        </h3>
                        <ButtonCircle3 onClick={handleCloseMenu}>
                          <MdClose className='text-2xl' />
                        </ButtonCircle3>
                      </div>
                      <div className='divide-y divide-neutral-300'>
                        {carts.length === 0 ? (
                          <p className='text-center text-gray-500'>Your cart is empty.</p>
                        ) : (
                          carts.map(renderProduct)
                        )}
                      </div>
                    </div>
                    {carts.length > 0 && (
                      <div className='absolute bottom-0 left-0 w-full p-5'>
                        <div className='bg-neutral-100 p-6 dark:bg-neutral-800'>
                          <span className='flex justify-between font-medium'>
                            <span>Subtotal</span>
                            <Subtotal carts={carts} />
                          </span>
                          <p className='block w-2/3 text-sm text-neutral-500'>
                            Tax included and shipping calculated at checkout.
                          </p>
                        </div>
                        <div className='mt-5 flex flex-col items-center gap-4'>
                          <ButtonPrimary onClick={handleCloseMenu} className='w-full' href='/checkout'>
                            Checkout
                          </ButtonPrimary>
                          <ButtonSecondary onClick={handleCloseMenu} href='/cart' className='w-fit text-center'>
                            View cart
                          </ButtonSecondary>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default CartSideBar
