import Loading from "@/components/bar/loading"
import CollectionHeader from "@/components/collections/CollectionHeader"
import CollectionFilter from "@/components/collections/Filter"
import FilterSortBar from "@/components/collections/FilterSortBar"
import ProductListing from "@/components/collections/ProductListing"
import CollectionSorter from "@/components/collections/Sorter"
import BenefitsSection from "@/components/home/sections/Benefits"
import PopluarCategoriesSection from "@/components/home/sections/PopluarCategories"
import { Button } from "@/components/ui/button"
import { ICategory, IProduct } from "@/lib/types"
import { getCategoryDetail } from "@/services/category-service"
import { getAllProducts, getProductsFromCategoryId } from "@/services/product-service"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const CollectionItemPage = () => {
  const location = useLocation()
  const path = location.pathname
  const id = path.split("/")[2]

  const [category, setCategory] = useState<ICategory | null>(null)
  const [products, setProducts] = useState<IProduct[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [rangePrices, setRangePrices] = useState([1, 2000000000]);
  const [text, setText] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [sortDir, setSortDir] = useState<string>("");

  useEffect(() => {
    
    fetchCategoryAndProducts()
  }, [id,sortBy,sortDir])

  const fetchCategoryAndProducts = async () => {
    setLoading(true)
    setError(null)

    try {
      const categoryResponse = await getCategoryDetail(Number(id))
      setCategory(categoryResponse)

      const productsResponse = await getProductsFromCategoryId(categoryResponse.id,100,0,text,rangePrices[0],rangePrices[1],sortBy,sortDir)
      setProducts(productsResponse)
    } catch (err) {
     console.log("as");
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='pb-24'>
      {loading ? (
        
        <Loading />
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <>
          {category && (
            <CollectionHeader title={category.name} bannerImg={category.imageUrl} description={category.description} />
          )}

<CollectionSorter sortBy={sortBy} sortDir={sortDir} setSortDir={setSortDir} setSortBy={setSortBy} />
          <div className='container pb-8 lg:pb-24'>
            <div className='mb-3 lg:hidden'>
              <FilterSortBar />
            </div>
            <div className='grid grid-cols-12 gap-3'>
              <div className='hidden md:col-span-5 md:block lg:col-span-3'>
              <CollectionFilter
                  rangePrices={rangePrices}
                  setRangePrices={setRangePrices}
                  text={text}
                  setText={setText}
                />
                <div className="flex place-items-end justify-end pr-5">
                  <Button variant={'default'} onClick={fetchCategoryAndProducts}>Search</Button>
                </div>
              </div>
              <div className='col-span-12 md:col-span-7 lg:col-span-9'>
                {products && <ProductListing products={products} />}
              </div>
            </div>
          </div>
          <PopluarCategoriesSection />
          <BenefitsSection />
        </>
      )}
    </main>
  )
}

export default CollectionItemPage
