import { useEffect, useState } from 'react'
import '../styles/Post.css'
import type { PostProps } from '../types'

export default function Post({ data, setCloseUp }: PostProps){
  const [liked, setLiked] = useState(false)
  const [commented, setCommented] = useState(false)
  const [sent, setSent] = useState(false)
    
    useEffect(() => {
        // [COPILOT] Update when images load and also wait for images before initial layout
        const imgs = Array.from(document.querySelectorAll('img')) as HTMLImageElement[]
        imgs.forEach(img => {
        if (!img.complete) img.addEventListener('load', () => {
            // [COPILOT] Size items once an image loads, to account for layout changes
            const event = new Event('resize')
            window.dispatchEvent(event)}, { once: true })
        })

        // [COPILOT] Wait for any not-yet-loaded images, then size items once
        const waitForImages = async () => {
        await Promise.all(imgs.map(img => {
            if (img.complete) return Promise.resolve()
            return new Promise<void>(res => img.addEventListener('load', () => res(), { once: true }))
        }))
        }
        void waitForImages()
        // [COPILOT] Also run a short timeout as a fallback
        const t = window.setTimeout(() => {
            const event = new Event('resize')
            window.dispatchEvent(event)
        }, 250)

        return () => {
        clearTimeout(t)
        imgs.forEach(img => {
            img.removeEventListener('load', () => {})
        })
        }
    }, [])
	return (
    <div className="post" onClick={() => setCloseUp && setCloseUp({ isCloseUp: true, data: data })}>
        <img src={data.postImage} alt="Post image" />
        <footer>
            <div className="user">
                <img src={data.user.userImage} alt="User profile picture" />
                <h5>{data.user.username}</h5>
            </div>
            <div className="postActions">
                <button
                  type="button"
                  className={`closeup-action like ${liked ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setLiked((prev) => !prev)
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler-heart">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`closeup-action comment ${commented ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCommented((prev) => !prev)
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler-message-circle">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`closeup-action send ${sent ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSent((prev) => !prev)
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler-send">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 14l11 -11" />
                    <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                  </svg>
                </button>
            </div>
        </footer>
    </div>
	)
}