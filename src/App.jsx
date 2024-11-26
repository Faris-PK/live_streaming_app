import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './components/Home'
import Room from './components/Room'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/room/:roomId' element={<Room/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App