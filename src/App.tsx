import Navbar from './components/Navbar'
import Carrousel from './components/Carrousel'
import Feed from './components/Feed'
import Perfil from './components/Perfil'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="div1"><Navbar /></div>
      <div className="div2"><Carrousel /></div>
      <div className="div3"><Feed /></div>
      <Perfil />
    </div>
  )
}

export default App;