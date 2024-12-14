import { configs } from "@/lib/config"
import authorizedAxiosInstance from "@/utils/authorizedAxios"

export const getMe = async () => {
  try {
    const respon = await authorizedAxiosInstance.get(`${configs.host}/customers/me`)
    const data = respon.data.data

    console.log(respon)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getMeStaff = async () => {
  try {
    const respon = await authorizedAxiosInstance.get(`${configs.host}/users/me`)
    const data = respon.data.data
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAllCustomers = async (query: string = "", pageSize: number = 20, offset: number = 0) => {
  try {
    const respon = await authorizedAxiosInstance.get(
      `${configs.host}/customers?query=${query}&pageSize=${pageSize}&offset=${offset}`,
    )
    const data = respon.data.data.items
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAllStaffs = async (pageSize: number = 20, offset: number = 0, query: string = "") => {
  try {
    const respon = await authorizedAxiosInstance.get(
      `${configs.host}/users?query=${query}&pageSize=${pageSize}&offset=${offset}`,
    )
    const data = respon.data.data.items
    return data
  } catch (error) {
    console.log(error)
  }
}


export const getNameCustomerFromId = async (id:number) => {
  try {
    const respon = await authorizedAxiosInstance.get(`${configs.host}/customers/${id}`)
    const data = respon.data.data
    return `${data.firstName} ${data.lastName}`
    return data
  } catch (error) {
    console.log(error)
  }
}