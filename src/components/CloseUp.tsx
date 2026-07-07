import type { CloseUpType } from '../types/index.ts'
import '../styles/CloseUp.css'
import PostActions from './PostActions.tsx'

export default function CloseUp({ data, closeOverlay }: CloseUpType) {
    return (
        <div className="closeup-overlay" onMouseDown={closeOverlay}>
            <button className="closeup-close-btn" onMouseDown={closeOverlay}>
                &times;
            </button>
            <div className="closeup-container" onMouseDown={(e) => e.stopPropagation()}>
                <img className="closeup-image" src={data?.postImage} alt="CloseUp post image" />
                <div className='closeup-info'>
                    <div className="user">
                        <img src={data?.user.userImage} alt="CloseUp user profile picture" />
                        <h5>{data?.user.username}</h5>
                    </div>

                    <div className="closeup-caption">
                        <p >{data?.caption}</p>
                    </div>
                    <div className = "closeup-comments">
                        <p><strong>@ddianapark</strong> Nice cat!</p>
                        <p><strong>@jazberlin:</strong> So cute!</p>
                        <p><strong>@ortalmagro:</strong> I want one!</p>
                    </div>
                    <footer className="closeup-footer">
                        <PostActions />
                    </footer>
                </div>
            </div>
        </div>
    )
}