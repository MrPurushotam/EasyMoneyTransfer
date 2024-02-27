import "./App.css"
import {Routes,Route,BrowserRouter as Router} from "react-router-dom"
import Singup from "./pages/Singup"
import Singin from "./pages/Singin"
import Dashboard from "./pages/Dashboard"
import Send from "./pages/Send"
import Home from "./pages/Home"
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark-edge.css'; // choose your theme
import SecureDashboardRoute from "./utils/SecureRoute"
import { SecureAuthRoute } from "./utils/SecureRoute"
toastConfig({ theme: 'dark-edge' })
export const ToastMessage=(message)=>{
  if(!message){
    console.log("No toast message provided")
  }
  toast(message)
}
function App() {

  return (
    <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route element={<SecureDashboardRoute/>}>
              <Route index path="/dashboard" element={<Dashboard/>} />
              <Route path="/send" element={<Send/>} />
            </Route>
            <Route element={<SecureAuthRoute/>}>
              <Route path="/signup" element={<Singup/>} />
              <Route path="/signin" element={<Singin/>} />
            </Route>
          </Routes>
        </Router>


    </div>
  )
}

export default App
