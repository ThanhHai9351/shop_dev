import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { configs } from "@/lib/config"
import authorizedAxiosInstance from "@/utils/authorizedAxios"
import Loading from "@/components/bar/loading"

const PaymentCallback: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const callbackToServer = async () => {
      const currentUrl = window.location.href

      const modifiedUrl = currentUrl.replace("http://localhost:3000", configs.host)
      console.log(modifiedUrl)
      try {
        const response = await authorizedAxiosInstance.get(modifiedUrl)

        if (response.status === 200) {
          console.log("Modified URL sent successfully:", response.data)
        } else {
          console.error("Failed to send modified URL:", response.data)
        }
      } catch (error) {
        console.error("Error sending modified URL to server:", error)
      }
    }

    callbackToServer()
    navigate("/me/cart")
  }, [])

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='text-center'>
        <Loading />
      </div>
    </div>
  )
}

export default PaymentCallback
