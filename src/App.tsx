import { useEffect, useState } from 'react'
import apiCalls from './services/apiCalls'
import Navbar from './components/Navbar'
import Carrousel from './components/Carrousel'
import Feed from './components/Feed'
import Perfil from './components/Perfil'
import './App.css'

function App() {
  const [posts, setPosts] = useState(null)
  const [stories, setStories] = useState(null)

  useEffect(() => {
    apiCalls.getCats(9).then(cats => {
      setPosts(cats.map((cat: any) => ({
        username: cat.breeds[0]?.name || cat.id,
        userImage: cat.url,
        postImage: cat.url,
        caption: "A cute cat",
        // likes: Math.floor(Math.random() * 1000),
        // comments: Math.floor(Math.random() * 500)
      })))
    })
    apiCalls.getCats(6).then(cats => {
      setStories(cats.map((cat: any) => ({
        username: cat.breeds[0]?.name || cat.id,
        userImage: cat.url,
        seen: Math.random() < 0.5
      })))
    })
  }, [])

  return (
    <div className="App">
      <div className="div1"><Navbar /></div>
      <div className="div2"><Carrousel stories={stories} /></div>
      <div className="div3"><Feed posts={posts} /></div>
      <Perfil />
    </div>
  )
}

export default App