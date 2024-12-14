import { useEffect, useState } from "react"
import ButtonPrimary from "@/shared/Button/ButtonPrimary"
import ContactInfo from "@/components/checkout/ContactInfo"
import ShippingAddress from "@/components/checkout/ShippingAddress"
import { Link, useNavigate } from "react-router-dom"
import CheckoutHeader from "@/components/checkout/CheckoutHeader"
import { ICart } from "@/lib/types"
import authorizedAxiosInstance from "@/utils/authorizedAxios"
import { configs } from "@/lib/config"
import { formatPrice } from "@/helpers/formatPrice"
import Total from "./total"

interface IOrderItem {
  productId: number
  quantity: number
}

const CheckoutPage = () => {
  const [carts, setCarts] = useState<ICart[]>([])
  const [tabActive, setTabActive] = useState<"ContactInfo" | "ShippingAddress" | "PaymentMethod">("ShippingAddress")
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/account/login")
    }

    const getCart = async () => {
      const dataCart = await authorizedAxiosInstance.get(`${configs.host}/carts/current-customer`)
      setCarts(dataCart.data.data.items)
    }
    getCart()
  }, [])

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id)
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" })
    }, 80)
  }

  const calculateSubtotal = (carts: ICart[]): number => {
    return carts.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const subtotal = calculateSubtotal(carts)

  const getOrderFromCart = () => {
    let orderItems: IOrderItem[] = []
    carts.forEach((cart) => {
      orderItems.push({ productId: cart.product.id, quantity: cart.quantity })
    })
    return {
      orderItems,
    }
  }

  const handleCheckout = async () => {
    try {
      const orderItems = carts.map((cart) => ({
        productId: cart.product.id,
        quantity: cart.quantity,
      }))

      const orders = await authorizedAxiosInstance.post(`${configs.host}/orders`, { orderItems })
      const OrderId = orders.data.data.id

      if (orders.data.statusCode === 200) {
        const responsePaymentUrl = await authorizedAxiosInstance.get(
          `${configs.host}/payments/vn-pay?orderId=${OrderId}&bankCode=NCB`,
        )

        window.location.href = responsePaymentUrl.data.data.paymentUrl
      }
    } catch (error) {
      console.log(error)
    }
  }

  const renderProduct = (item: ICart, index: number) => {
    const { product, quantity } = item

    return (
      <div key={index} className='flex gap-2'>
        <div className='relative size-16 overflow-hidden rounded-xl'>
          <img src={product.imageUrl} alt={product.name} className='size-full object-contain object-center h-full' />
          <Link className='absolute inset-0' to={`/products/${product.id}`} />
        </div>

        <div className='flex grow items-center justify-between'>
          <div>
            <h3 className='text-sm font-medium leading-tight'>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </h3>
            <span className='text-xs text-neutral-500'>{product.categoryId}</span>
          </div>
          <div>
            <span className='text-sm'>
              {formatPrice(product.price)} x {quantity}
            </span>
          </div>
        </div>
      </div>
    )
  }

  const renderLeft = () => {
    return (
      <div className='space-y-9'>
        <div id='ContactInfo' className='scroll-mt-24'>
          <ContactInfo />
        </div>

        <div id='ShippingAddress' className='scroll-mt-24'>
          <ShippingAddress
            isActive={tabActive === "ShippingAddress"}
            onOpenActive={() => {
              setTabActive("ShippingAddress")
              handleScrollToEl("ShippingAddress")
            }}
            onCloseActive={() => {
              setTabActive("PaymentMethod")
              handleScrollToEl("PaymentMethod")
            }}
          />
        </div>

        <div className='hidden pt-6 lg:block'>
          <ButtonPrimary onClick={handleCheckout} className='w-full'>
            Pay Now
          </ButtonPrimary>
        </div>

        <div className='hidden border-t border-neutral-300  pt-4 dark:border-neutral-600 lg:block'>
          <p className='text-sm text-neutral-500'>All rights reserved Stock Mordern</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <CheckoutHeader />
      <div className='nc-CheckoutPage relative'>
        <div className='absolute left-0 top-0 -z-10 size-full border-neutral-200 bg-white p-4 dark:border-neutral-600 dark:bg-neutral-900 lg:w-1/2 lg:border-r' />
        <main className='container pb-8 lg:pb-28 '>
          <div className='flex flex-col lg:flex-row'>
            <div className='w-full pt-4 lg:basis-1/2 lg:p-9'>{renderLeft()}</div>

            <div className='relative w-full lg:basis-1/2'>
              <div className='sticky top-0 pt-4 lg:p-9'>
                <div className='space-y-2'>{carts.map((item, index) => renderProduct(item, index))}</div>
                <Total
                  carts={carts}
                  voucher={{
                    type: null,
                    value: 0,
                    // type: "percentage",
                    // value: 10,
                  }}
                />
                <ButtonPrimary className='mt-8 w-full lg:hidden'>Pay Now</ButtonPrimary>
              </div>
            </div>
          </div>
          <div className='mt-4 border-t border-neutral-300 pt-4  dark:border-neutral-600 lg:hidden'>
            <p className='text-sm text-neutral-500'>All rights reserved Stock Mordern</p>
          </div>
        </main>
      </div>
    </>
  )
}

export default CheckoutPage
