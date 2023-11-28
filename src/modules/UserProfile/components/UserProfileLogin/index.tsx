export interface IUserProfileLoginProps {
    login: string;
}

export function UserProfileLogin({ login }: IUserProfileLoginProps) {
    return <div>{login}</div>;
}
