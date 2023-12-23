import { WidgetsId } from "./enums";
import { Stores } from "./stores/types";

export interface AppOptions {
    stores: Stores;
}

// Response of user data
// More info reference https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user
export interface IResponseUserData {
    avatar_url: string;
    bio: string;
    created_at: string;
    followers: number;
    followers_url: string;
    following: number;
    following_url: string;
    gists_url: string;
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

export interface IResponseFollower {
    login: string;
    avatar_url: string;
    url: string;
}

export type IFollower = IResponseFollower & any;

export interface IResponseNotification {
    created_at: string;
    title: string;
    pull_request: {
        html_url: string;
    };
}

export type INotification = IResponseNotification;

export interface ITopLanguage {
    name: string;
    color: string;
    size: number;
    count: number;
}

export type ITopLanguageWithMaxSize = ITopLanguage & {
    maxSize: number;
};

export interface INode {
    color: string;
    name: string;
}

export interface INodeWithSize {
    node: INode;
    size: number;
}

export interface ILanguage {
    name: string;
    languages: {
        edges: INodeWithSize[];
    };
}

export interface IPullRequest {
    totalCount: number;
    nodes: IPullRequestNode[];
}

export interface IPullRequestNode {
    createdAt: string;
    number: number;
    title: string;
    state: string;
    url: string;
    reviewDecision: string | null;
    reviewRequests: {
        nodes: {
            requestedReviewer: {
                login: string;
            };
        }[];
    };
    reviews: {
        nodes: {
            state: string;
            createdAt: string;
            author: {
                login: string;
            };
        };
    };
}

export interface IWidget {
    id: WidgetsId | string;
    enabled: boolean;
}

export enum ISocialAccountsProvider {
    INSTAGRAM = "INSTAGRAM",
    YOUTUBE = "YOUTUBE",
    LINKEDIN = "LINKEDIN",
    TWITTER = "TWITTER",
    FACEBOOK = "FACEBOOK",
}

export interface ISocialAccountsItem {
    type: string;
    name: string;
    provider: ISocialAccountsProvider;
}
