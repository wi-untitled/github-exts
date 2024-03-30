import { RequestError as RequestErrorBase } from "octokit";

declare module "octokit" {
    export interface OctokitOptions {
        auth?: string;
    }

    export interface IOctokit {
        graphql<T extends object>(data: object): Promise<T>;
    }

    export class Octokit implements IOctokit {
        constructor(options?: OctokitOptions);

        authenticate(): void;

        getAuthenticated(): Promise<any>;

        rest: {
            users: {
                getAuthenticated(): Promise<any>;
            };
            search: {
                issuesAndPullRequests({ q }: { q: string }): Promise<any>;
            };
        };

        graphql<T extends object>(data: object): Promise<T>;
    }

    interface IRequestError {
        response: RequestErrorBase["response"];
    }
    export class RequestError {
        status: RequestErrorBase["status"];
        response: {
            data: {
                message: string;
            };
        };
    }
}
