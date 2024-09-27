
import { BrowserRouter as Router ,Routes,Route } from "react-router-dom"
import ScrollTop from "./scrollTop/ScrollTop"
import MyState from "./context/myState"
import { ToastContainer } from "react-toastify"
import { routes } from "./app.route"

const App = () => {
  return (
    <MyState>
      <Router>
        <ScrollTop />
         <Routes>
          {
            routes.map((item,index)=>(
              <Route key={index} path={item.path} element={item.element}/>
            ))
          }
         </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  )
}

export default App