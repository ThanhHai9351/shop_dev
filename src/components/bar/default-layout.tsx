import React from "react"
import Header from "@/components/Header/Header"
import Footer from "@/shared/Footer/Footer"
import Sidebar from "@/components/sidebar"
import SalesNav from "@/components/Header/SalesNav"
import ChatButton from "@/shared/Button/ChatButtonDialog"
import { CartProvider } from "@/context/CartContext"

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <CartProvider>
        <SalesNav />
        <Header />
        <main>{children}</main>
        <ChatButton />
        <Footer />
      </CartProvider>
    </>
  )
}

const DefaultLayoutNotShow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  )
}

const DefaultLayoutAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='min-h-screen w-full bg-white text-black flex'>
      <Sidebar />
      {children}
    </div>
  )
}

export { DefaultLayout, DefaultLayoutAdmin, DefaultLayoutNotShow }
