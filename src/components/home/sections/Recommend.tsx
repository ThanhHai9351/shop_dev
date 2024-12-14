import ProductCardSmall from "@/components/products/ProductCardSmall"
import { ICategory, IProduct } from "@/lib/types"
import { getAllCategorires } from "@/services/category-service"
import { getAllProducts, getProductsFromCategoryId } from "@/services/product-service"
import ButtonSecondary from "@/shared/Button/ButtonSecondary"
import { useEffect, useState } from "react"

export interface PropsCateSelected {
  id: number
  name: string
}
const RecommendedSection = () => {
  const [categories, setCategories] = useState<ICategory[] | null>(null)
  const [products, setProducts] = useState<IProduct[] | null>(null)
  const [categorySelected, setCategorySelected] = useState<PropsCateSelected>({ id: 0, name: "All" })

  useEffect(() => {
    const getData = async () => {
      const dataCategories = await getAllCategorires(6)
      setCategories([
        {
          id: 0,
          name: "All",
          imageUrl: "",
          slug: "",
          description: "",
        },
        ...dataCategories,
      ])
      const dataProduct = await getAllProducts(12)
      setProducts(dataProduct)
    }
    getData()
  }, [])

  useEffect(() => {
    const getNewProducts = async () => {
      if (categorySelected.name === "All") {
        const products = await getAllProducts(12)
        setProducts(products)
      } else {
        const products = await getProductsFromCategoryId(categorySelected.id)
        setProducts(products)
      }
    }
    getNewProducts()
  }, [categorySelected])
  return (
    <section>
      <div className='container pb-8 xl:pb-24'>
        <h2 className='mb-4 text-lg font-semibold lg:mb-8'>Recommended For You</h2>
        <div className='mb-4'>
          <ul className='flex flex-wrap gap-2 lg:gap-3'>
            {categories &&
              categories.map((navItem) => (
                <li key={navItem.id}>
                  <ButtonSecondary
                    onClick={() => setCategorySelected({ id: navItem.id, name: navItem.name })}
                    sizeClass={`py-2 px-3  ${navItem.name === categorySelected.name ? "border  border-gray-800" : ""}`}
                  >
                    {navItem.name}
                  </ButtonSecondary>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <ul className='grid grid-cols-12 gap-2'>
            {products &&
              products.map((product) => (
                <li key={product.name} className='col-span-12 md:col-span-6 xl:col-span-3'>
                  <ProductCardSmall {...product} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default RecommendedSection
