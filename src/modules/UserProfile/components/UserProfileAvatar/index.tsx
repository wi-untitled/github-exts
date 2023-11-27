export interface IUserProfileAvatarProps {
    url: string;
}

export function UserProfileAvatar({ url }: IUserProfileAvatarProps) {
    return (
        <img className="rounded-full h-24 w-24" src={url} alt="avatar_url" />
    );
}
