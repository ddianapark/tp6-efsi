import type { FeedProps } from "../types/index.ts"
import type { PostType } from "../types/index.ts"
import Post from "./Post.tsx"
import "../styles/Feed.css"
import { useEffect, useRef } from "react"

const Feed = ({ posts, setCloseUp }: FeedProps) => {
  const gridRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const grid: HTMLElement | null = gridRef.current
    if (!grid) return

    const getRowGap = (g: HTMLElement) => {
      const style = getComputedStyle(g)
      const rowGap = style.getPropertyValue('row-gap') || style.getPropertyValue('gap')
      return parseInt(rowGap) || 0
    }

    const sizeItems = () => {
      const rowHeight = parseInt(getComputedStyle(grid).getPropertyValue('grid-auto-rows')) || 8
      const rowGap = getRowGap(grid)
      grid.querySelectorAll('.post').forEach(item => {
        const element = item as HTMLElement
        const height = element.getBoundingClientRect().height
        const span = Math.ceil((height + rowGap) / (rowHeight + rowGap))
        element.style.gridRowEnd = `span ${span}`
      })
    }

    // Update when images load and also wait for images before initial layout
    const imgs = Array.from(grid.querySelectorAll('img')) as HTMLImageElement[]
    imgs.forEach(img => {
      if (!img.complete) img.addEventListener('load', sizeItems)
    })

    // Wait for any not-yet-loaded images, then size items once
    const waitForImages = async () => {
      await Promise.all(imgs.map(img => {
        if (img.complete) return Promise.resolve()
        return new Promise<void>(res => img.addEventListener('load', () => res(), { once: true }))
      }))
      sizeItems()
    }
    void waitForImages()
    // Also run a short timeout as a fallback
    const t = window.setTimeout(sizeItems, 250)
    window.addEventListener('resize', sizeItems)

    return () => {
      clearTimeout(t)
      imgs.forEach(img => {
        img.removeEventListener('load', sizeItems)
      })
      window.removeEventListener('resize', sizeItems)
    }
  }, [posts])

  return (
    <div className="feed">
      <section className="posts" ref={gridRef}>
        {
          posts?.map((post: PostType, index: number) => (
            <Post key={index} data={post} setCloseUp={setCloseUp} />
          ))
        }
      </section>
    </div>
  )
}

export default Feed