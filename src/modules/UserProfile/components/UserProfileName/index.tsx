import { FC } from "react";

export interface IUserProfileNameProps {
    name: string;
}

export const UserProfileName: FC<IUserProfileNameProps> = ({ name }) => {
    return <div className="font-bold">{name}</div>;
};
