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
    
    // Call sizeItems immediately when posts change
    sizeItems()
    
    // Add listener for resize events (dispatched by Post.tsx when images load)
    window.addEventListener('resize', sizeItems)
    
    // Cleanup
    return () => {
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