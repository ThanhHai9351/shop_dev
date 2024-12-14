import { useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"

interface NavigatePageProps {
  text: string
  path: string
}

const NavigatePage = ({ text, path }: NavigatePageProps) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    const userVerify: {
      id: string
      name: string
      role: string
    } = {
      id: "ádasd",
      name: "Thanh Hải",
      role: "admin",
    }
    if (userVerify.role === "admin") {
      navigate(path)
      return
    }

    if (path.toLowerCase().includes("admin")) {
      console.log("mày có tuổi dô tragn này")
    }
  }

  return <button onClick={handleNavigate}>{text}</button>
}

export default NavigatePage


