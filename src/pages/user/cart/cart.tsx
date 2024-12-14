import Breadcrumbs from "@/components/Breadcrumbs"
import RelatedProducts from "@/components/products/RelatedProducts"
import { configs } from "@/lib/config"
import { ICart } from "@/lib/types"
import ButtonLink from "@/shared/Button/ButtonLink"
import ButtonPrimary from "@/shared/Button/ButtonPrimary"
import authorizedAxiosInstance from "@/utils/authorizedAxios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Subtotal from "./subtotal"
import { formatPrice } from "@/helpers/formatPrice"
import CartQuantityHandler from "@/components/CartQuantityHandler"
import { toast } from "sonner"

const renderProduct = (item: ICart, cartId: number, getCart: () => void) => {
  const { id, product, quantity } = item

  const handleRemoveItem = async () => {
    try {
      const response = await authorizedAxiosInstance.patch(`${configs.host}/carts/current-customer/remove-items`, {
        cartItemIds: [id],
      })

      if (response.data.statusCode === 200) {
        getCart()
        toast.success(`${product.name} removed successfully`)
      }
    } catch (error) {
      console.error("Failed to remove item:", error)
    }
  }

  return (
    <tr key={cartId} className='border-b border-neutral-300 dark:border-neutral-500'>
      <td className='py-4 md:flex md:justify-between'>
        <div className='flex items-center gap-3 pl-6'>
          <div className='relative size-14 shrink-0 overflow-hidden rounded-sm'>
            <img src={product.imageUrl} alt={product.name} className='size-full object-contain object-center h-full' />
            <Link className='absolute inset-0' to={`/products/${product.id}`} />
          </div>
          <div className='leading-tight'>
            <p className='font-medium'>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </p>
            <span className='my-1 text-sm text-neutral-500 dark:text-neutral-300'>{product.categoryId}</span>
          </div>
        </div>
        <div className='block items-center gap-4 px-6 pt-3 md:flex lg:hidden'>
          <div className='flex items-center justify-end gap-6'>
            <div className='space-x-4'>
              <span className='font-medium'>{formatPrice(product.price)}</span>
            </div>
            <CartQuantityHandler initialQuantity={quantity} productId={product.id} getCart={getCart} className='h-10' />
          </div>
          <div>
            <ButtonLink onClick={handleRemoveItem}>Remove</ButtonLink>
          </div>
        </div>
      </td>

      <td className='hidden lg:table-cell'>
        <span className='font-medium'>{formatPrice(product.price)}</span>
      </td>

      <td className='hidden lg:table-cell'>
        <span className=' inline-block'>
          <CartQuantityHandler initialQuantity={quantity} productId={product.id} getCart={getCart} className='h-10' />
        </span>
      </td>

      <td className='hidden lg:table-cell'>
        <span className='font-medium'>{formatPrice(product.price)}</span>
      </td>

      <td className='hidden lg:table-cell'>
        <ButtonLink onClick={handleRemoveItem}>Remove</ButtonLink>
      </td>
    </tr>
  )
}

const CartPage = () => {
  const [carts, setCarts] = useState<ICart[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/account/login")
    }
    getCart()
  }, [])

  const getCart = async () => {
    const dataCart = await authorizedAxiosInstance.get(`${configs.host}/carts/current-customer`)
    setCarts(dataCart.data.data.items)
  }

  const breadcrumbitems = [{ title: <ButtonLink href='/'>Home</ButtonLink> }, { title: "Your Shopping Cart" }]
  return (
    <main className='nc-CartPage'>
      <div className='container pb-8 lg:pb-24 p-10'>
        <Breadcrumbs Items={breadcrumbitems} />

        <div className=' py-16 lg:pb-28 lg:pt-20 '>
          <div className='mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between'>
            <h2 className='block text-2xl font-semibold sm:text-3xl lg:text-4xl'>Shopping Cart</h2>
            <div>
              <ButtonLink href='/collections' className='text-sm'>
                Continue Shopping
              </ButtonLink>
            </div>
          </div>
          <div className='mb-8 w-full divide-y divide-neutral-300 bg-white dark:bg-neutral-900'>
            <table className='table w-full'>
              <thead className='mb-2 border-b border-neutral-200'>
                <tr className='text-left text-sm text-neutral-500'>
                  <th scope='col' className='w-4/12 p-4'>
                    Product
                  </th>
                  <th scope='col' className='hidden w-2/12 p-4 lg:table-cell'>
                    Price
                  </th>
                  <th scope='col' className='hidden w-2/12 p-4 lg:table-cell'>
                    Quantity
                  </th>
                  <th scope='col' className='hidden w-2/12 p-4 lg:table-cell'>
                    Total
                  </th>
                  <th scope='col' className='hidden w-1/12 p-4 lg:table-cell'>
                    action
                  </th>
                </tr>
              </thead>
              <tbody className='space-y-2'>{carts.map((item) => renderProduct(item, item.id, getCart))}</tbody>
            </table>
          </div>
          <div className='lg:flex lg:justify-end'>
            <div className='lg:w-1/4'>
              <div className='sticky top-28'>
                <div>
                  <div className='flex gap-2'>
                    <span>Subtotal:</span>
                    <Subtotal carts={carts} />
                  </div>
                  <div className='flex flex-col pb-4 pt-1 text-sm text-neutral-500 dark:text-neutral-300'>
                    <span>Tax included and shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                <ButtonPrimary href='/checkout' className='w-full'>
                  Checkout
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
        <RelatedProducts />
      </div>
    </main>
  )
}

export default CartPage
