import { IUserData } from "src/types";

export interface IState {
    isOpen: boolean;
    updateIsOpen: (isOpen: boolean) => void;

    setUserData: (userData: IUserData) => void;
    handleLogout: () => void;
    setAccessToken: (accessToken: string | null) => void;
}

export interface ILoadable {
    isLoading: boolean;
    updateLoading: (isLoading: boolean) => void;
}
