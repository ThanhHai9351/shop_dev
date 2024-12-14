import { createContext, useContext, useEffect, useState } from "react"

const AppContext = createContext({
  accessToken: "",
  setAccessToken: (accessToken: string) => {},
})

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used withthin an AppProvider!")
  }
  return context
}

const AppProvider = ({
  children,
  initialAccessToken = "",
}: {
  children: React.ReactNode
  initialAccessToken?: string
  initialRefreshToken?: string
}) => {
  const [accessToken, setAccessToken] = useState(initialAccessToken)
  useEffect(() => {
    console.log("re refresh")
  }, [accessToken])
  return <AppContext.Provider value={{ accessToken, setAccessToken }}>{children}</AppContext.Provider>
}

export default AppProvider
