import { useState, useEffect } from 'react'
import apiCalls from '../services/apiCalls'
import Post from './Post.tsx'
import type { CloseUpType, PostType, ProfileProps } from '../types/index.ts'
import '../styles/Profile.css'
import CloseUp from './CloseUp.tsx'
import Loader from './Loader.tsx'
import Edit from './icons/Edit.tsx'

export default function Profile({ isProfile, user }: ProfileProps) {
  const [posts, setPosts] = useState<any[] | null>(null)
  const [closeUp, setCloseUp] = useState<CloseUpType>({ isCloseUp: false, data: null })
  const [loadingPosts, setLoadingPosts] = useState(isProfile)
  const [activeTab, setActiveTab] = useState('posts')

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
        <div className="profile-header">
          <div className="profile-header-top">
            <div className="profile-avatar-section">
              <img className="profile-avatar" src={user?.userImage} alt={`${user?.username} profile`} />
            </div>
            
            <div className="profile-info-section">
              <div className="profile-username-action">
                <h1 className="profile-username">@{user?.username}</h1>
                <button className="profile-settings-button" type="button" aria-label="Configuración">
                  <Edit />
                </button>
              </div>
              <div className="profile-stats">
                <div className="stat">
                  <span className="stat-number">{posts?.length || 0}</span>
                  <span className="stat-label">posts</span>
                </div>
                <div className="stat">
                  <span className="stat-number">41</span>
                  <span className="stat-label">followers</span>
                </div>
                <div className="stat">
                  <span className="stat-number">17</span>
                  <span className="stat-label">following</span>
                </div>
              </div>
              
              <div className="profile-bio">
                <p>Hello and welcome!</p>
                <p>This is my profile and there are lots of cats! 🐱</p>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-tabs">
          <button 
            className={`profile-tab ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            POSTS
          </button>
          <button 
            className={`profile-tab ${activeTab === 'reels' ? 'active' : ''}`}
            onClick={() => setActiveTab('reels')}
          >
            REELS
          </button>
          <button 
            className={`profile-tab ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            SAVED
          </button>
        </div>

        <div className="profile-posts">
          {loadingPosts ? 
          <div className="loader-container">
            <Loader />
            <p className="loading">Cargando posts...</p>
          </div> : 
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