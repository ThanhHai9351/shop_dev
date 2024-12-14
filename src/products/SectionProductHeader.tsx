import { BsLightningCharge } from "react-icons/bs"
import { FaCheck } from "react-icons/fa6"
import { HiMiniArrowUturnLeft } from "react-icons/hi2"
import { LuInfo, LuTruck } from "react-icons/lu"

import ImageShowCase from "@/components/ImageShowCase"
import ProductCard from "@/components/products/ProductCard"
import Banner from "@/components/products/Banner"
import ProductSlider from "@/components/products/ProductSlider"
import ProductTabs from "@/components/products/ProductTabs"
import Button from "@/shared/Button/Button"
import ButtonPrimary from "@/shared/Button/ButtonPrimary"
import ButtonSecondary from "@/shared/Button/ButtonSecondary"
import InputNumber from "@/shared/InputNumber/InputNumber"
import { IProduct } from "@/lib/types"
import { getProductRandom } from "@/services/product-service"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import authorizedAxiosInstance from "@/utils/authorizedAxios"
import { configs } from "@/lib/config"

const SectionProduct = ({ product }: { product: IProduct }) => {
  const [productRandom, setProductRandom] = useState<IProduct[]>([])
  const [quantity, setQuantity] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const getProduct = async () => {
      const product = await getProductRandom(7)
      setProductRandom(product)
    }
    getProduct()
  }, [])

  const addToCart = async () => {
    try {
      setIsLoading(true)

      const productId = product.id

      const response = await authorizedAxiosInstance.patch(`${configs.host}/carts/current-customer/add-to-cart`, {
        productId,
        quantity,
      })

      toast.success(`${product.name} added to cart`)
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Cannot add the product to cart")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='grid grid-cols-12 gap-4 lg:gap-6'>
      <div className='col-span-12 md:col-span-6 lg:col-span-8'>
        <ImageShowCase shots={Array(product.imageUrl)} />
        <div className='hidden md:block'>
          <ProductTabs attrs={product.attrs} />
          {productRandom.length > 0 ? (
            <>
              <ProductSlider
                products={productRandom}
                title='Similar Items You Might Like'
                subText='Based on what customers bought'
              />
              <ProductSlider
                products={productRandom}
                title='Shop For More Compatible Items'
                subText='Items that pair well together'
              />
            </>
          ) : (
            <></>
          )}
          <Banner />
        </div>
      </div>

      <div className='col-span-12 md:col-span-6 lg:col-span-4'>
        <span className='mb-2 text-xs'>STOCKMART</span>
        <h1 className='mb-0 text-3xl font-bold'>{product.name}</h1>

        <div className='mb-5 space-y-1'>
          <h1 className='text-2xl font-semibold'>
            <span className='text-green-700'>${product.price}</span>{" "}
            {/* <span className=' text-neutral-500 line-through'>${prevPrice}</span> */}
          </h1>
          <p className='text-sm'>Tax included.</p>
        </div>

        <div className='mb-6'>
          <p className='text-neutral-500 dark:text-neutral-300'>
            {product.attrs ? (product.attrs.description ? product.attrs.description : "") : ""}
          </p>
        </div>
        {/* 
        <div className='mb-6'>
          <h4 className='text-sm'>Color:</h4>
          <ColorPicker />
        </div> */}

        <div className=''>
          <h4 className='text-sm mb-2'>Quantity:</h4>
          <div className='flex gap-2'>
            <InputNumber value={quantity} onChange={setQuantity} />
            <ButtonSecondary className='w-full' onClick={addToCart}>
              Add to Cart
            </ButtonSecondary>
          </div>
        </div>
        <div className='mb-5 mt-2 flex items-center gap-5'>
          <ButtonPrimary onClick={addToCart} className='w-full'>
            Buy Now
          </ButtonPrimary>
        </div>

        <div className='mb-6 flex'>
          <div className='p-1 text-green-700'>
            <FaCheck />
          </div>
          <div>
            <p>Pickup available at shop location</p>
            <p className='mb-1'>Usually read in 24 hours</p>
            <p className='text-sm'>View store information</p>
          </div>
        </div>

        <div className='divide-y divide-neutral-300  dark:divide-neutral-400'>
          <div className='flex gap-4 py-4'>
            <div>
              <BsLightningCharge />
            </div>
            <div>
              <h3 className='text-sm text-red-600'>2 in Stock Now</h3>
              <p className='mt-1 text-neutral-500  dark:text-neutral-300'>
                Upgrade your tech collection with the latest must-have item, available now in limited quantities.
              </p>
            </div>
          </div>
          <div className='flex gap-4 py-4'>
            <div>
              <LuTruck />
            </div>
            <div>
              <h3 className='flex items-start gap-2 text-sm font-semibold'>
                <span className='inline-block'>Next Day Delivery</span> <LuInfo className='inline-block' size={12} />
              </h3>
              <p className='text-neutral-500  dark:text-neutral-300'>Lightning-fast shipping, guaranteed.</p>
            </div>
          </div>
          <div className='flex gap-4 py-4'>
            <div className='text-primary  dark:text-white'>
              <HiMiniArrowUturnLeft />
            </div>
            <div>
              <h3 className='text-sm  font-semibold text-primary dark:text-white'>Free 90-day returns</h3>
              <p className='text-neutral-500  dark:text-neutral-300'>Shop risk-free with easy returns.</p>
            </div>
          </div>
        </div>

        <div className='mb-8 flex items-center justify-between gap-4 rounded-md  border-2 border-blue-600 px-9 py-4 dark:border-neutral-400'>
          <div>
            <h3 className='text-sm font-semibold'>Packaging Note:</h3>
            <p className='text-neutral-500  dark:text-neutral-300'>
              Research and development value proposition graphical user interface investor. Startup business plan user
              experience
            </p>
          </div>
          <div className='text-primary'>
            <LuInfo />
          </div>
        </div>
        <div className='mb-8 rounded-md bg-primary px-10 py-4 text-white'>
          <div>
            <span className='mb-5 inline-block'>StockMart</span>
            <h3 className='font-semibold'>Discount & Free shipping on Your first purchase.</h3>
            <Button href='/' className='text-yellow-500'>
              {` First-Timer's Deal`}
            </Button>
          </div>
        </div>

        <div className='mb-8'>
          <div>
            <h3>RELATED PRODUCT</h3>
            <div>{/* <ProductCard className="" /> */}</div>
          </div>
        </div>
        {productRandom.length > 0 ? <ProductCard className='w-60' {...productRandom[0]} /> : ""}
      </div>

      <div className='col-span-12 md:hidden'>
        <ProductTabs attrs={product.attrs} />
        {/* {productRandom.length > 0 ? (
            <>
              <ProductSlider
                products={productRandom}
                title='Similar Items You Might Like'
                subText='Based on what customers bought'
              />
              <ProductSlider
                products={productRandom}
                title='Shop For More Compatible Items'
                subText='Items that pair well together'
              />
            </>
          ) : (
            ""
          )} */}
        <Banner />
      </div>
    </div>
  )
}

export default SectionProduct
