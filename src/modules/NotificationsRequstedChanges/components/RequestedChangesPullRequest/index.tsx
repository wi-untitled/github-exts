import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ExclamationIcon from "src/assets/exclamation.svg?react";

dayjs.extend(relativeTime);

export interface IRequestedChangesPullRequestProps {
    title: string;
    full_name: string;
    created_at: any;
    html_url: string;
}

export function RequestedChangesPullRequest({
    title,
    created_at,
    html_url,
    full_name,
}: IRequestedChangesPullRequestProps) {
    return (
        <div className="flex flex-row p-2 items-center border-2 border-transparent rounded-lg hover:border-red-400">
            <div className="mr-2">
                <ExclamationIcon className="w-4 h-4 fill-current dark:text-dark text-accent" />
            </div>
            <div className="flex flex-col flex-1 text-left overflow-hidden whitespace-nowrap">
                <a
                    href={html_url}
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
                <span className="text-2xs text-end">created</span>
                <span className="text-xs">
                    {dayjs(created_at.split("T")).fromNow()}
                </span>
            </div>
        </div>
    );
}
