import { configs } from "@/lib/config"
import authorizedAxiosInstance from "@/utils/authorizedAxios"

export const getAllProductsWhistlist = async (
    sizePage: number = 20,
    offset: number = 0,
    query: string = "",
    priceFrom: number = 1,
    priceTo: number = 20000000,
    sortBy: string = "",
    sortDir: string = "",
  ) => {
    try {
      if (sortBy === "") {
        const productsResponse = await authorizedAxiosInstance.get(
          `${configs.host}/products/wishlist-current-customer?query=${query}&pageSize=${sizePage}&offset=${offset}&priceFrom=${priceFrom}&&priceTo=${priceTo}`,
        )
        const data = productsResponse.data.data.items
        return data
      } else {
        const productsResponse = await authorizedAxiosInstance.get(
          `${configs.host}/products/wishlist-current-customer?query=${query}&pageSize=${sizePage}&offset=${offset}&sortBy=${sortBy}&sortDir=${sortDir}&priceFrom=${priceFrom}&&priceTo=${priceTo}`,
        )
        const data = productsResponse.data.data.items
        return data
      }
    } catch (error) {
      console.log(error)
    }
  }