import './App.css'
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/post/:id' element={<Post/>}/>
        <Route path='/create' element={<CreatePost/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
