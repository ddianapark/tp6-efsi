import { useState, useEffect } from 'react'
import apiCalls from '../services/apiCalls'
import Post from './Post.tsx'
import type { CloseUpType, PostType, ProfileProps } from '../types/index.ts'
import '../styles/Profile.css'
import CloseUp from './CloseUp.tsx'

export default function Profile({ isProfile, user }: ProfileProps) {
  const [posts, setPosts] = useState<any[] | null>(null)
  const [closeUp, setCloseUp] = useState<CloseUpType>({ isCloseUp: false, data: null })
  const [loadingPosts, setLoadingPosts] = useState(isProfile) // [COPILOT] Carga inicial basada en si el perfil está abierto
  useEffect(() => {
    let mounted = true
    setLoadingPosts(true)

    if (!user) {
      if (mounted) {
        setPosts(null)
        setLoadingPosts(false)
      }
      return () => { mounted = false }
    }

    apiCalls.getCats(9)
      .then(cats => {
        if (!mounted) return
        const items = cats.map((cat: any) => ({
          user: {
            username: user.username,
            userImage: user.userImage
          },
          postImage: cat.url,
          caption: "A cute cat",
        }))
        setPosts(items)
      })
      .catch(err => console.error(err))
      .finally(() => { if (mounted) setLoadingPosts(false) })

    return () => { mounted = false }
  }, [user]) // Se ejecuta cuando `user` cambia o al montar

  return (
    <>
      <div className="profile">
        <div className="profile-container" onMouseDown={(e) => e.stopPropagation()}>
          <img className="profile-image" src={user?.userImage} alt={`${user?.username} profile picture`} />
          <h2>{user?.username}</h2>
        </div>
        <div className='profile-info'>
          <p><strong>Posts:</strong> {posts?.length || 0}</p>
          <p><strong>Followers:</strong> 1.5k</p>
          <p><strong>Following:</strong> 300</p>
        </div>
        <div className='profile-posts'>
          {loadingPosts ? <p>Cargando posts...</p> : 
            posts?.map((post: PostType, index: number) => (
              <Post key={index} data={post} setCloseUp={setCloseUp} />
            ))
          }
        </div>
      </div>
      {
        closeUp.isCloseUp && closeUp.data &&
          <CloseUp isCloseUp={closeUp.isCloseUp} data={closeUp.data} closeOverlay={() => setCloseUp({ isCloseUp: false, data: null })}/>
      }
    </>
  )
}