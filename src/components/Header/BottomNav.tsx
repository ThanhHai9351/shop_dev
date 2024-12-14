import NavigationItem from "../NavItem"
import PhoneBar from "./PhoneBar"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { ICategory } from "@/lib/types"
import { getAllCategorires } from "@/services/category-service"
// import DataCategoryId from "@/data/defaultData"

const BottomNav = () => {

  const [categories, setCategories] = useState<ICategory[]>([])
  const [productsLaptop, setProductsLaptop] = useState<ICategory[]>([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCategories = await getAllCategorires(6)
        setCategories([
          ...dataCategories,
        ])
        // const dataProductsLaptop = await getProductsFromCategoryId()
        // setProductsLaptop(dataProductsLaptop)
      } catch (error) {
        console.log("Failed to fetch data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='container'>
      <div className='hidden border-t border-neutral-300 py-6 dark:border-neutral-600 xl:block'>
        <div className='flex items-center justify-between text-sm'>
          <div className='flex items-center text-base font-semibold'>
            <PhoneBar />
            {productsLaptop.length > 0 && (
              <NavigationItem
                menuItem={{
                  id: `0`,
                  href: `/collections`,
                  name: "Laptops",
                  type: "dropdown",
                }}
              >
                <ul className='h-full bg-white py-2 dark:bg-neutral-800'>
                  {productsLaptop.map((lap) => (
                    <li key={lap.id}>
                      <Link
                        to={`/products/${lap.id}`}
                        className='inline-block w-full px-3 py-2 font-medium hover:text-primary'
                      >
                        {lap.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationItem>
            )}
            {categories.length > 0 &&
              categories.map((item) => (
                <NavigationItem menuItem={{ id: String(item.id), name: item.name }} key={item.id} />
              ))}
          </div>
          {/* Help Section */}
          <div>
            <p className='text-neutral-500 dark:text-neutral-200'>
              Need help? Call Us: <span className='font-semibold text-black dark:text-white'>+84 1234 555 77</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomNav
