import { Stores } from "./stores/types";

export interface AppOptions {
    stores: Stores;
}

// Response of user data
// More info reference https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user
export interface IResponseUserData {
    avatar_url: string;
    bio: string;
    // company: null;
    created_at: string;
    // email: null;
    followers: number;
    followers_url: string;
    following: number;
    following_url: string;
    gists_url: string;
    // gravatar_id: null;
    // hireadle: null;
    html_url: string;
    location: string;
    login: string;
    name: string;
    node_id: string;
    organizations_url: string;
    public_gists: number;
    public_repos: number;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    twitter_username: string;
    type: string;
    updated_at: string;
    url: string;
}

export type IUserData = IResponseUserData & any;
