import { useEffect, useState } from 'react'
import apiCalls from './services/apiCalls'
import Navbar from './components/Navbar'
import Carrousel from './components/Carrousel'
import Feed from './components/Feed'
import Perfil from './components/Perfil'
import CloseUp from './components/CloseUp'
import type { CloseUpType } from './types/index.ts'
import './App.css'

function App() {
  const [posts, setPosts] = useState<any[] | null>(null)
  const [stories, setStories] = useState<any[] | null>(null)
  const [closeUp, setCloseUp] = useState<CloseUpType>({ isCloseUp: false, data: null })

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
    apiCalls.getCats(7).then(cats => {
      setStories(cats.map((cat: any) => ({
        username: cat.breeds[0]?.name || cat.id,
        userImage: cat.url,
        seen: Math.random() < 0.5
      })))
    })
  }, [])

  return (
    <>
      <div className="App">
        <div className="div1"><Navbar /></div>
        <section className='scroll'>
          <div className="div2"><Carrousel stories={stories} /></div>
          <div className="div3"><Feed posts={posts} setCloseUp={setCloseUp} /></div>
        </section>
        <Perfil />
      </div>
      {
        closeUp.isCloseUp && closeUp.data &&
          <CloseUp isCloseUp={closeUp.isCloseUp} data={closeUp.data} closeOverlay={() => setCloseUp({ isCloseUp: false, data: null })}/>
      }
    </>
  )
}

export default App