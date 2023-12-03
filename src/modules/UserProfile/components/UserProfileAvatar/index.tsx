export interface IUserProfileAvatarProps {
    url: string;
}

export function UserProfileAvatar({ url }: IUserProfileAvatarProps) {
    return (
        <div className="h-10 w-10">
            <img
                className="rounded-full h-10 w-10"
                src={url}
                alt="avatar_url"
            />
        </div>
    );
}
