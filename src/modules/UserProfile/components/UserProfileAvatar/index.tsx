export interface IUserProfileAvatarProps {
    url: string;
}

export function UserProfileAvatar({ url }: IUserProfileAvatarProps) {
    return <img className="rounded-full h- w-16" src={url} alt="avatar_url" />;
}
