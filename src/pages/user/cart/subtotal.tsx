import { formatPrice } from "@/helpers/formatPrice"
import { ICart } from "@/lib/types"

export default function Subtotal({ carts }: { carts: ICart[] }) {
  const calculateTotalPrice = (cartItems: ICart[]): number => {
    return cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0)
  }

  return (
    <>
      <span className='font-semibold'>{formatPrice(calculateTotalPrice(carts))}</span>
    </>
  )
}
