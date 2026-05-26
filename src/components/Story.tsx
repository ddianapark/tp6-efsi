import { useEffect, useState } from 'react'
import '../styles/Story.css'
import type { StoryProps } from '../types'
import apiCalls from '../services/apiCalls'

export default function Story({ data }: StoryProps) {
  const [catImg, setCatImg] = useState<string | null>(null)

  useEffect(() => {
    const fetchCatImg = async () => {
      const img = await apiCalls.getCatImg()
      setCatImg(img)
    }

    fetchCatImg()
  }, [])

  return (
    <div className="story">
      <img src={catImg || undefined} alt="Story" className="story-avatar" />
      <span className="story-username">@{data.username}</span>
    </div>
  )
}