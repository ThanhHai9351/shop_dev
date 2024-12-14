import { configs } from "@/lib/config"
import authorizedAxiosInstance from "@/utils/authorizedAxios"

export const getAllCategorires = async (sizePage: number = 20, offset: number = 0, query: string = "") => {
  try {
    const dataCategories = await authorizedAxiosInstance.get(
      `${configs.host}/categories?query=${query}&pageSize=${sizePage}&offset=${offset}`,
    )
    const data = await dataCategories.data.data.items
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getCategoryDetail = async (id: number) => {
  try {
    const dataCategories = await authorizedAxiosInstance.get(`${configs.host}/categories/${id}`)
    const data = await dataCategories.data.data
    return data
  } catch (error) {
    console.log(error)
  }
}
