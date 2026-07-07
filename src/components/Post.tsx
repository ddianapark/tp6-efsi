import { useEffect } from 'react'
import '../styles/Post.css'
import type { PostProps } from '../types'
import PostActions from './PostActions.tsx'

export default function Post({ data, setCloseUp }: PostProps){
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
            <PostActions />
        </footer>
    </div>
	)
}