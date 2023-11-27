export interface IUserProfileNameProps {
    name: string;
}

export function UserProfileName({ name }: IUserProfileNameProps) {
    return <div>{name}</div>;
}
