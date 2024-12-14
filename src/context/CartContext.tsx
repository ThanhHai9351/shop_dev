import React, { createContext, useContext, useState, useEffect } from "react"
import authorizedAxiosInstance from "@/utils/authorizedAxios"
import { configs } from "@/lib/config"
import { ICart } from "@/lib/types"

interface ICartContext {
  carts: ICart[]
  fetchCart: () => void
  addToCart: (product: ICart) => void
}

const CartContext = createContext<ICartContext | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [carts, setCarts] = useState<ICart[]>([])

  const fetchCart = async () => {
    try {
      const response = await authorizedAxiosInstance.get(`${configs.host}/carts/current-customer`)

      setCarts(response.data.data.items || [])
    } catch (error) {
      console.error("Error fetching cart:", error)
    }
  }

  const addToCart = async (product: ICart) => {
    try {
      const response = await authorizedAxiosInstance.post(`${configs.host}/carts/current-customer/add-item`, product)
      console.log(response)
      if (response.data.statusCode === 200) {
        fetchCart()
      }
    } catch (error) {
      console.error("Error adding item to cart:", error)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return <CartContext.Provider value={{ carts, fetchCart, addToCart }}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
