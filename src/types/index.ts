export interface FeedProps {
    posts: PostType[]
}

export interface PostProps {
    data: PostType
}

export interface PostType {
    username: string;
    userImage: string;
    postImage: string;
    caption: string;
    likes: number;
    comments: number;
}

export interface Story {
    username: string,
    userImage: string,
    seen: boolean
}

export interface CarrouselProps {
    stories: Story[]
}