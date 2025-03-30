import './App.css'
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
function App() {

  return (
    <>
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/post/:id' element={<Post/>}/>
        <Route path='/create' element={<PrivateRoute><CreatePost/></PrivateRoute>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
