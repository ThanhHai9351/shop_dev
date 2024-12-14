import { configs } from "@/lib/config"
import authorizedAxiosInstance from "@/utils/authorizedAxios"

export const getAllProducts = async (
  sizePage: number = 20,
  offset: number = 0,
  query: string = "",
  priceFrom: number | string = "",
  priceTo: number | string = "",
  sortBy: string = "",
  sortDir: string = "",
) => {
  try {
    if (sortBy === "") {
      const productsResponse = await authorizedAxiosInstance.get(
        `${configs.host}/products?query=${query}&pageSize=${sizePage}&offset=${offset}&priceFrom=${priceFrom}&&priceTo=${priceTo}`,
      )
      const data = productsResponse.data.data.items
      return data
    } else {
      const productsResponse = await authorizedAxiosInstance.get(
        `${configs.host}/products?query=${query}&pageSize=${sizePage}&offset=${offset}&sortBy=${sortBy}&sortDir=${sortDir}&priceFrom=${priceFrom}&&priceTo=${priceTo}`,
      )
      const data = productsResponse.data.data.items
      return data
    }
  } catch (error) {
    console.log(error)
  }
}

export const getproductDetail = async (id: number) => {
  try {
    const productsResponse = await authorizedAxiosInstance.get(`${configs.host}/products/${id}`)
    let dataProduct = productsResponse.data.data
    const dataAttrs = findProductAttributesKey(dataProduct)
    dataProduct.attrs = dataAttrs
    return dataProduct
  } catch (error) {
    console.log(error)
  }
}
const findProductAttributesKey = (obj: Record<string, any>): any => {
  let attr = null
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && key.startsWith("product") && key.endsWith("AttributesDTO")) {
      attr = obj[key]
      break
    }
  }
  return attr
}


export const getProductsFromCategoryId = async (
  categoryId: number,
  sizePage: number = 20,
  offset: number = 0,
  query: string = "",
  priceFrom: number | string = "",
  priceTo: number | string = "",
  sortBy: string = "",
  sortDir: string = "",
) => {
  try {
    if (sortBy === "") {
      const productsResponse = await authorizedAxiosInstance.get(
        `${configs.host}/products/category/${categoryId}?query=${query}&pageSize=${sizePage}&offset=${offset}&priceFrom=${priceFrom}&&priceTo=${priceTo}`,
      )
      const data = productsResponse.data.data.items
      return data
    } else {
      const productsResponse = await authorizedAxiosInstance.get(
        `${configs.host}/products/category/${categoryId}?sortBy=${sortBy}&sortDir=${sortDir}&query=${query}&pageSize=${sizePage}&offset=${offset}&priceFrom=${priceFrom}&&priceTo=${priceTo}`,
      )
      const data = productsResponse.data.data.items
      return data
    }
  } catch (error) {
    console.log(error)
  }
}

export const getProductRandom = async (pageSize: number = 1, priceFrom: number|string = "", priceTo: number | string = "") => {
  try {
    // const randomOffset = Math.floor(Math.random() * 5) + 1
    const randomOffset = 0
    const productsResponse = await authorizedAxiosInstance.get(
      `${configs.host}/products?pageSize=${pageSize}&offset=${randomOffset}&priceFrom=${priceFrom}&&priceTo=${priceTo}`,
    )
    const data = productsResponse?.data.data.items
    return data
  } catch (error) {
    console.log(error)
  }
}
