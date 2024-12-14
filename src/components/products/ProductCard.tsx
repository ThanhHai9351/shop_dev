import type { FC } from "react"
import ButtonPrimary from "@/shared/Button/ButtonPrimary"
import { NavLink } from "react-router-dom"
import { IProduct } from "@/lib/types"
import { formatCurrencyVND } from "@/pages/admin/order/order"

interface ProductCardProps extends IProduct {
  className?: string
}

const ProductCard: FC<ProductCardProps> = ({ className, id, name, imageUrl, price }) => {
  return (
    <NavLink
      to={`/products/${id}`}
      className={`group inline-block h-full overflow-hidden rounded-md bg-white dark:bg-neutral-900 ${className}`}
    >
      <div className=''>
        <div className='relative overflow-hidden'>
          <div className='relative aspect-square bg-white'>
            <img src={imageUrl} alt='product graphic' className='object-contain' sizes='100%' />
          </div>
          <div className='absolute bottom-2 w-full px-4 text-center transition-all duration-300 group-hover:bottom-2 lg:-bottom-full'>
            <ButtonPrimary className='w-full text-sm'>Quick View</ButtonPrimary>
          </div>
        </div>
        <div className='px-5 py-4'>
          <span className='text-xs'>STOCKMART</span>
          <h3 className='line-clamp-2 text-ellipsis font-bold'>{name}</h3>
          <p className='font-bold'>{formatCurrencyVND(price)}</p>
          {/* {onSale && <ColorPicker />}
          <span className='text-xs'>STOCKMART</span>
          <h3 className='line-clamp-2 text-ellipsis font-bold'>{name}</h3>
          {onSale ? (
            <p>
              <span className='font-bold text-green-700'>${currentPrice}.00</span>{" "}
              <span className='text-sm font-semibold text-neutral-500 line-through'>${previousPrice}.00</span>
            </p>
          ) : (
            <p className='font-bold'>${currentPrice}.00</p>
          )} */}
        </div>
      </div>
    </NavLink>
  )
}

export default ProductCard
