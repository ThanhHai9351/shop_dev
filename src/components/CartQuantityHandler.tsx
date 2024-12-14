import { useState } from "react"
import { FiMinus, FiPlus } from "react-icons/fi"
import authorizedAxiosInstance from "@/utils/authorizedAxios"
import { configs } from "@/lib/config"
import { ICartQuantityHandler } from "@/lib/types"
import { toast } from "sonner"

const CartQuantityHandler: React.FC<ICartQuantityHandler> = ({
  initialQuantity,
  productId,
  getCart,
  className = "",
}) => {
  const [quantity, setQuantity] = useState(initialQuantity)
  const [isLoading, setIsLoading] = useState(false)

  const handleQuantityChange = async (delta: number) => {
    const newQuantity = quantity + delta
    setIsLoading(true)

    if (newQuantity < 1) return

    setQuantity(newQuantity)
    setIsLoading(true)

    try {
      const response = await authorizedAxiosInstance.patch(`${configs.host}/carts/current-customer/add-to-cart`, {
        productId,
        quantity: delta,
      })
      getCart()

      if (response.data.statusCode === 200) {
        toast.success("Update quantity successfully")
        setQuantity(newQuantity)
      }
    } catch (error) {
      toast.error("Failed to update quantity")
      setQuantity(quantity)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`flex items-center h-10 ${className}`}>
      <button
        onClick={() => handleQuantityChange(-1)}
        disabled={quantity <= 1 || isLoading}
        className='flex h-8 w-8 items-center justify-center rounded-l border border-neutral-200 
                   hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50'
      >
        <FiMinus className='h-4 w-4' />
      </button>

      <div className='flex h-8 w-12 items-center justify-center border-y border-neutral-200 bg-white'>{quantity}</div>

      <button
        onClick={() => handleQuantityChange(+1)}
        disabled={isLoading}
        className='flex h-8 w-8 items-center justify-center rounded-r border border-neutral-200 
                   hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50'
      >
        <FiPlus className='h-4 w-4' />
      </button>
    </div>
  )
}

export default CartQuantityHandler
