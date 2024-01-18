

import { Outlet, useLocation, Navigate} from 'react-router-dom'

//Components

import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import {useAuth} from './hooks/useAuth'


function App() {

  const [loading, auth] = useAuth()


  
  const location = useLocation()

  if(location.pathname === "/" && !auth){
    loading
    Navigate('/login')


  }
 


  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Outlet />
      </div>


      <Footer />


    </div>
  )
}

export default App
