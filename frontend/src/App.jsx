import React from 'react'
import { useSelector } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from './Pages/Home'
import IntroPage from './Pages/IntroPage'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup';
import Video from './Pages/Video'
import WatchList from './Pages/WatchList';

const App = () => {
  const user = useSelector((state)=>state.login.current)
  return (
    <BrowserRouter>
      <Routes>
       <Route path='/'>
        <Route index element={user ?<Home/>:<Navigate to="/signin" replace></Navigate>}/>
        <Route path='video/:id' element={user?<Video/>:<Navigate to="/signin" replace></Navigate>}></Route>
        <Route path='myList' element={<WatchList/>}/>
       </Route>
       <Route path='signup'>
        <Route index element={!user ? <IntroPage/>:<Navigate to="/signin" replace></Navigate>}/>
        <Route path='form' element={!user ?<Signup/>:<Navigate to="/"></Navigate>}/>
       </Route>
       <Route path='/signin' element={!user ?<Signin/>:<Navigate to="/"></Navigate>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App