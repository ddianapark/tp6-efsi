export interface FeedProps {
    posts: PostType[] | null,
    setCloseUp?: (state: CloseUpType) => void
}

export type PostProps = {
    data: PostType,
    setCloseUp?: (state: CloseUpType) => void
}

export interface PostType {
    username: string,
    userImage: string,
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
    data: StoryType;
}

export interface StoryType {
    username: string;
    userImage: string;
    seen: boolean;
}

export interface CarrouselProps {
    stories: StoryType[] | null;
}