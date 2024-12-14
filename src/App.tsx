import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { routes } from "./routes"
import { DefaultLayout, DefaultLayoutNotShow, DefaultLayoutAdmin } from "./components/bar/default-layout"

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route: any, index: number) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.isAdmin ? (
                <DefaultLayoutAdmin>
                  <route.element />
                </DefaultLayoutAdmin>
              ) : route.isShowHeader ? (
                <DefaultLayout>
                  <route.element />
                </DefaultLayout>
              ) : (
                <DefaultLayoutNotShow>
                  <route.element />
                </DefaultLayoutNotShow>
              )
            }
          />
        ))}
      </Routes>
    </Router>
  )
}

export default App
