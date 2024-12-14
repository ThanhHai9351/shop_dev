import type { FC } from "react"
import React from "react"

import type { ProductType } from "@/data/types"
import { Link } from "react-router-dom"

const ProductCardSmall: FC<ProductType> = ({ coverImage, name, slug, onSale, previousPrice, currentPrice }) => {
  return (
    <Link
      to={`/products/${slug}`}
      className='group inline-block size-full overflow-hidden rounded-md bg-white p-4 dark:bg-neutral-900'
    >
      <div className='flex gap-3'>
        <div className='relative w-[60px] overflow-hidden '>
          <div className='relative aspect-square size-full rounded-md bg-white'>
            <img src={coverImage} alt='product' className='object-contain h-full' sizes='100%' />
          </div>
        </div>
        <div className='flex grow items-center justify-between gap-4'>
          <div>
            <span className='text-xs'>STOCKMART</span>
            <h3 className='line-clamp-2 text-ellipsis text-sm font-semibold'>{name}</h3>
          </div>
          <div className='text-end  text-sm'>
            {onSale ? (
              <>
                <p className='font-bold  text-green-700'>${currentPrice}</p>
                <p className='text-sm font-bold text-neutral-500 line-through'>${previousPrice}</p>
              </>
            ) : (
              <p className='font-semibold'>${currentPrice}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCardSmall