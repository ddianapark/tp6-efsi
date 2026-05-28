export interface FeedProps {
    posts: PostType[] | null,
    setCloseUp?: (state: CloseUpType) => void
}

export interface PostProps {
    data: PostType,
    setCloseUp?: (state: CloseUpType) => void
}

export interface User {
    username: string,
    userImage: string
}

export interface PostType {
    user: User
    postImage: string,
    caption: string,
    // likes: number,
    // comments: number
}

export interface CloseUpType {
    isCloseUp: boolean,
    data: PostType | null,
    closeOverlay?: () => void
}

export interface StoryProps {
    data: User;
}

export interface CarrouselProps {
    stories: StoryProps[] | null;
}

export interface ProfileProps{
    isProfile: boolean,
    user: User,
    closeOverlay?: () => void
}

export interface NavBarProps {
    user: User | null,
    setProfile?: (state: ProfileProps) => void
}