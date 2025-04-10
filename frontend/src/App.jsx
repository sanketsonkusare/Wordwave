import './App.css'
import Home from './pages/Home';
import Navbar from "./pages/Navbar";
import Post from './pages/Post';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import Signup from './pages/Signup';
import Footer from './pages/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import ErrorBoundary from "./ErrorBoundary";

function App() {
  

  return (
    <>
    <AuthProvider>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/create-post" element={<CreatePost />} />
        <Route path='/post/:id' element={<ErrorBoundary><Post/></ErrorBoundary>}/>
        <Route path='/create' element={<PrivateRoute><CreatePost/></PrivateRoute>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
