import '../styles/Story.css'
import type { StoryProps } from '../types'

export default function Story({ data }: StoryProps) {

  return (
    <div className="story">
      <img src={data.userImage} alt="Story" className="story-avatar" />
      <span className="story-username">@{data.username}</span>
    </div>
  )
}