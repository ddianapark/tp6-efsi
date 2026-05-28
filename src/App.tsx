import { useEffect, useState } from 'react'
import apiCalls from './services/apiCalls'
import Navbar from './components/Navbar'
import Carrousel from './components/Carrousel'
import Feed from './components/Feed'
import CloseUp from './components/CloseUp'
import Profile from './components/Profile.tsx'
import type { CloseUpType, ProfileProps, User } from './types/index.ts'
import './App.css'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<any[] | null>(null)
  const [stories, setStories] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true) // <-- [GEMINI] Estado para el Loader
  const [closeUp, setCloseUp] = useState<CloseUpType>({ isCloseUp: false, data: null })
  const [profile, setProfile] = useState<ProfileProps>({ isProfile: false, user: null })

  useEffect(() => {
    setIsLoading(true) // <-- [GEMINI] Mostrar el Loader al iniciar la carga

    // [GEMINI] Ejecutamos ambas peticiones en paralelo para mejorar velocidad
    Promise.all([
      apiCalls.getCats(9),
      apiCalls.getCats(7)
    ]).then(([catsForPosts, catsForStories]) => {
      
      // [GEMINI] Estructuramos los posts respetando la jerarquía de Post.tsx (data.user.username)
      const itemsPosts = catsForPosts.map((cat: any) => ({
        id: cat.id,
        postImage: cat.url,
        caption: "A cute cat",
        user: {
          username: cat.breeds[0]?.name || `cat_${cat.id}`,
          userImage: cat.url,
        }
      }))
      
      const itemsStories = catsForStories.map((cat: any) => ({
        username: cat.breeds?.[0]?.name || `user_${cat.id}`,
        userImage: cat.url
      }))

      setPosts(itemsPosts)
      setStories(itemsStories)

      // [GEMINI] Definimos el usuario logueado por defecto
      if (itemsPosts.length > 0) {
        setUser({ 
          username: itemsPosts[0].user.username, 
          userImage: itemsPosts[0].user.userImage 
        })
      }
    })
    .catch(err => console.error("Error cargando la API", err))
    .finally(() => setIsLoading(false)) // <-- [GEMINI] Apagamos el loader al terminar
  }, [])

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Cargando miau-gram...</p>
      </div>
    )
  }

  return (
    <>
      <div className="App">
        <div className="div1"><Navbar user={user} setProfile={setProfile} /></div>
        <section className='scroll'>
          <div className="div2"><Carrousel stories={stories} /></div>
          <div className="div3"><Feed posts={posts} setCloseUp={setCloseUp} /></div>
        </section>
      </div>
      {
        closeUp.isCloseUp && closeUp.data &&
          <CloseUp isCloseUp={closeUp.isCloseUp} data={closeUp.data} closeOverlay={() => setCloseUp({ isCloseUp: false, data: null })}/>
      }
      {
        profile.isProfile && profile.user &&
        <Profile isProfile={profile.isProfile} user={profile.user} closeOverlay={() => setProfile({ isProfile: false, user: null })}/>
      }
    </>
  )
}

export default App