import Story from "./Story";
import './Carrousel.css'

export default function Carrousel() {
  return (
    <div className="carrousel">
      <div id="carouselExample" className="carousel slide" data-bs-interval="false" data-bs-touch="true">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev" aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false" style={{ display: 'inline-block' }}>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next" aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false" style={{ display: 'inline-block' }}>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </button>
      </div>
    </div>
  )
}