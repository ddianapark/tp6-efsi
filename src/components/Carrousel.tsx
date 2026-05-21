import Story from "./Story";
import '../styles/Carrousel.css'

export default function Carrousel() {
  return (
    <div className="carrousel">
      <div id="carrouselExample" className="carrousel slide" data-bs-interval="false" data-bs-touch="true">
        <div className="carrousel-inner">
          <div className="carrousel-item active">
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
          </div>
        </div>

        <button className="carrousel-control-prev" type="button" data-bs-target="#carrouselExample" data-bs-slide="prev" aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false" style={{ display: 'inline-block' }}>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </button>

        <button className="carrousel-control-next" type="button" data-bs-target="#carrouselExample" data-bs-slide="next" aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false" style={{ display: 'inline-block' }}>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </button>
      </div>
    </div>
  )
}