import ProductCard from "@/components/products/ProductCard"
import { IProduct } from "@/lib/types"
import { getProductRandom } from "@/services/product-service"
import { useEffect, useState } from "react"

const relatedProductsSection = () => {
  const [productRandom, setProductRandom] = useState<IProduct[]>([])
  useEffect(() => {
    const getProduct = async () => {
      const product = await getProductRandom(6)
      setProductRandom(product)
    }
    getProduct()
  }, [])
  return (
    <section>
      <div className='pb-24 p-3'>
        <div className=' mb-6'>
          <h2 className='text-2xl font-semibold'>Related Products</h2>
        </div>
        <div>
          <ul className='grid grid-cols-12 gap-3'>
            {productRandom.map((product) => (
              <li key={product.name} className='col-span-12 md:col-span-4 lg:col-span-2'>
                <ProductCard className='w-full' {...product} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default relatedProductsSection
