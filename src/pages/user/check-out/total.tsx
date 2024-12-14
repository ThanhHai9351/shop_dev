import { ICart } from "@/lib/types"
import Subtotal from "../cart/subtotal"
import { formatPrice } from "@/helpers/formatPrice"

export default function Total({
  carts,
  voucher,
}: {
  carts: ICart[]
  voucher?: { type: "fixed" | "percentage" | null; value: number | 0 }
}) {
  const calculateSubtotal = (carts: ICart[]): number => {
    return carts.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const subtotal = calculateSubtotal(carts)

  const calculateVoucherDiscount = (): number => {
    if (!voucher) return 0
    else if (voucher.type === "fixed") {
      return voucher.value
    } else if (voucher.type === "percentage") {
      return (voucher.value / 100) * subtotal
    }

    return 0
  }

  const shippingFee = 24.9
  const voucherDiscount = calculateVoucherDiscount()

  const totalAmount = subtotal + shippingFee - voucherDiscount

  return (
    <>
      <div className='mt-10 border-t border-neutral-300 pt-6 text-sm dark:border-neutral-600'>
        <div className='mt-4 flex justify-between'>
          <span>Subtotal</span>
          <Subtotal carts={carts} />
        </div>
        <div className='mt-2 flex justify-between'>
          <span>Shipping</span>
          <span className='font-semibold'>{formatPrice(shippingFee)}</span>
        </div>
        <div className='mt-2 flex justify-between'>
          <span>Voucher</span>
          <span className='font-semibold'>-{formatPrice(voucherDiscount)}</span>
        </div>
        <div className='mt-2 flex justify-between text-lg font-semibold'>
          <span>Total (Dollar)</span>
          <span>${formatPrice(totalAmount)}</span>
        </div>
        <div className='mt-2 flex justify-between text-lg font-semibold'>
          <span>Total</span>
          <span>{formatPrice(totalAmount)} VND</span>
        </div>
      </div>
    </>
  )
}
