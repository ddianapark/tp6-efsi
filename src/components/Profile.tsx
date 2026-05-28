import { useState } from 'react'
import apiCalls from '../services/apiCalls'
import Post from './Post'
import type { CloseUpType, PostType, ProfileProps } from '../types/index.ts'
import '../styles/Profile.css'

export default function Profile({ isProfile, user, closeOverlay }: ProfileProps) {
  const [posts, setPosts] = useState<any[] | null>(null)
  const [closeUp, setCloseUp] = useState<CloseUpType>({ isCloseUp: false, data: null })
  const [loadingPosts, setLoadingPosts] = useState(true)

  apiCalls.getCats(9).then(cats => {
      const items = cats.map((cat: any) => ({
      user:{
        username: user.username,
        userImage: user.userImage
      },
      postImage: cat.url,
      caption: "A cute cat",
      // likes: Math.floor(Math.random() * 1000),
      // comments: Math.floor(Math.random() * 500)
    }))
      setPosts(items)
    })
    .catch(err => console.error(err))
    .finally(() => setLoadingPosts(false))
  , [user] // [GEMINI] Se ejecuta solo cuando el usuario cambia o se monta

  return (
    <div className="profile">
      <button className="profile-close-btn" onMouseDown={closeOverlay}>
        &times;
      </button>
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
  )
}