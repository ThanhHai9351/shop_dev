import CategoryCard from "@/components/CategoryCard"
import { ICategory } from "@/lib/types"
import { getAllCategorires } from "@/services/category-service"
import { useEffect, useState } from "react"

const PopluarCategoriesSection = () => {
  const [categories, setCategory] = useState<ICategory[] | null>(null)
  useEffect(() => {
    const getAllCategories = async () => {
      const data = await getAllCategorires(6)
      setCategory(data)
    }
    getAllCategories()
  }, [])

  return (
    <section>
      <div className='container pb-8 xl:pb-24 p-5'>
        <h2 className='mb-6 text-2xl font-semibold lg:mb-8'>Popular Categories</h2>
        <div>
          <ul className='grid grid-cols-12 gap-2'>
            {categories &&
              categories.map((listItem, index) => (
                <li key={index} className='col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2'>
                  <CategoryCard {...listItem} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default PopluarCategoriesSection
