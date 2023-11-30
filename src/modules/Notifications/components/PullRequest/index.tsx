import { IconPullRequest } from "src/components";
import { makeGithubPullRequestUrl } from "src/utils";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export interface IPullRequestProps {
    title: string;
    full_name: string;
    updated_at: any;
    url: string;
}

export function PullRequest({
    title,
    updated_at,
    url,
    full_name,
}: IPullRequestProps) {
    return (
        <div className="flex flex-row p-2 items-center border-2 border-transparent rounded-lg hover:border-green-400">
            <div className="mr-2">
                <IconPullRequest />
            </div>
            <div className="flex flex-col flex-1 text-left overflow-hidden whitespace-nowrap">
                <a
                    href={makeGithubPullRequestUrl(url)}
                    target="_blank"
                    className="text-sm overflow-ellipsis overflow-hidden hover:underline"
                >
                    {full_name}
                </a>
                <div className="text-xs overflow-ellipsis overflow-hidden">
                    {title}
                </div>
            </div>
            <div className="flex flex-col ml-1">
                <div className="text-xs">
                    {dayjs(updated_at.split("T")).fromNow()}
                </div>
            </div>
        </div>
    );
}
