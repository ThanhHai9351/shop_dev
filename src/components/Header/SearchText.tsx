import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { RiSearch2Line } from "react-icons/ri"
import { Link, useNavigate } from "react-router-dom"
import { getAllProducts } from "@/services/product-service"
import { IProduct } from "@/lib/types"

const SearchText = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [recommendations, setRecommendations] = useState<IProduct[]>([])
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (searchTerm.trim() === "") {
        setRecommendations([])
        setDropdownVisible(false)
        return
      }
      try {
        const results = await getAllProducts(6, 0, searchTerm)
        setRecommendations(results)
        setDropdownVisible(true)
      } catch (error) {
        console.error("Error fetching recommendations:", error)
      }
    }

    const debounce = setTimeout(() => {
      fetchRecommendations()
    }, 300)
    return () => clearTimeout(debounce)
  }, [searchTerm])

  const handleChooseProduct = (productId: number) => {
    navigate(`/products/${productId}`)
    setSearchTerm("");
    setDropdownVisible(!isDropdownVisible)
  }

  return (
    <div className='relative w-full'>
      <div className='hidden w-full items-center gap-5 rounded border-2 border-primary/15 bg-white pr-3 transition-all duration-300 hover:border-primary dark:border-white/15 dark:bg-neutral-950 xl:flex'>
        <Input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='border-transparent placeholder:text-neutral-500 focus:border-transparent'
          placeholder='What are you looking for ...'
        />
        <RiSearch2Line className='text-2xl text-neutral-500' />
      </div>

      {isDropdownVisible && recommendations.length > 0 && (
        <div className='absolute left-0 right-0 z-50 mt-2 max-h-72 overflow-auto rounded-lg border bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900'>
          {recommendations.map((product) => (
            <div
              key={product.id}
              onClick={() => handleChooseProduct(product.id)}
              className='flex items-center gap-4 px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800'
            >
              <img src={product.imageUrl} alt={product.name} className='h-12 w-12 rounded object-cover' />
              <div>
                <p className='text-sm font-semibold text-neutral-700 dark:text-neutral-200'>{product.name}</p>
                <p className='text-sm text-primary'>${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchText
