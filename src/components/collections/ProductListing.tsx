import ProductCard from "../products/ProductCard"
import { FC, useEffect, useState } from "react"
import authorizedAxiosInstance from "@/utils/authorizedAxios"
import { configs } from "@/lib/config"
import { IProduct } from "@/lib/types"

interface ProductListingProps {
  products: IProduct[]
}

const ProductListing: FC<ProductListingProps> = ({ products }) => {
  return (
    <div className='grid grid-cols-10 gap-3'>
      {products.map((product, index) => (
        <ProductCard key={index} {...product} className='col-span-10 md:col-span-5 lg:col-span-2' />
      ))}
    </div>
  )
}

export default ProductListing
