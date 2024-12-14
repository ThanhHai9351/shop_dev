import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import AppProvider from "./app-provider"
import { ToastContainer } from "react-toastify"
import { Toaster } from "sonner"
import "react-toastify/dist/ReactToastify.css"
import Loading from "./components/bar/loading"
import { HelmetProvider } from "react-helmet-async"

const accessToken = localStorage.getItem("accessToken")

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <AppProvider initialAccessToken={accessToken || ""}>
        <Suspense fallback={<Loading />}>
          <App />
          <Toaster richColors />
        </Suspense>
        <ToastContainer />
      </AppProvider>
    </HelmetProvider>
  </StrictMode>,
)
