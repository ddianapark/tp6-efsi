import { useEffect, useState } from 'react'
import '../styles/Story.css'
import { getCatImg } from '../services/apiCalls'

export default function Story() {
  const [catImg, setCatImg] = useState<string | null>(null)

  useEffect(() => {
    const fetchCatImg = async () => {
      const img = await getCatImg()
      setCatImg(img)
    }

    fetchCatImg()
  }, [])

  return (
    <div className="story">
      <img src={catImg || undefined} alt="Story" className="story-avatar" />
      <span className="story-username">@username</span>
    </div>
  )
}