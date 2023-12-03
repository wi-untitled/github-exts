import { FC } from "react";

export interface IUserProfileLoginProps {
    login: string;
}

export const UserProfileLogin: FC<IUserProfileLoginProps> = ({ login }) => {
    return <div className="dark:text-gray-400 text-gray-500">{login}</div>;
};
