

// Hooks
import { useAuth } from "./hooks/useAuth";

// router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// components
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

// pages
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import EditProfile from "./pages/editProfile/EditProfile";
import Profile from "./pages/profile/Profile";
import Photo from "./pages/photo/Photo";
import Search from "./pages/search/Search";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
         
            <Route path="/profile" element={auth ? <EditProfile/> : <Navigate to="/login"/>}/>
            <Route path="/register" element={!auth ? <Register /> : <Navigate to="/" />}/>
            <Route path="/users/:id" element={auth ? <Profile/> : <Navigate to="/login"/>}/>
            <Route path="/search" element={auth ? <Search/> : <Navigate to="/login"/>}/>
            <Route path="/photos/:id" element={auth ? <Photo/> : <Navigate to="/login"/>}/>
            <Route path="/login" element={!auth ? <Login /> : <Navigate to="/" />}/>
            <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />}/>
           
            
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;