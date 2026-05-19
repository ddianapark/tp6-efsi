import { useState } from 'react'
import Navbar from './components/Navbar'
import Carrousel from './components/Carrousel'
import Feed from './components/Feed'
import Perfil from './components/Perfil'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Carrousel />
      <Feed />
      <Perfil />
    </>
  )
}

export default App
