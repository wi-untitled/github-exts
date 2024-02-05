import clsx from "clsx";
import { Tooltip } from "react-tooltip";
import { FeatureFlag } from "src/core";
import RequestIcon from "./assets/request.svg?react";
import FollowingIcon from "./assets/following.svg?react";
import StatsIcon from "./assets/stats.svg?react";
import ApprovedIcon from "./assets/approved.svg?react";
import GearsIcon from "./assets/gears.svg?react";
import NotificationIcon from "./assets/notification.svg?react";
import TopIcon from "./assets/top.svg?react";
import FollowersIcon from "./assets/followers.svg?react";
import TooltipIcon from "./assets/tooltip.svg?react";
import RefreshIcon from "./assets/refresh.svg?react";

export interface ISettingsTileProps {
    title?: string;
    onClick?: () => void;
    enabled?: boolean;
    id: string;
    info?: string;
}

export function SettingsTile({
    id,
    enabled,
    onClick,
    info,
}: ISettingsTileProps) {
    const Icon =
        {
            ["NotificationsRequestedChanges"]: RequestIcon,
            ["NotificationsApprovedTop10"]: ApprovedIcon,
            ["Notifications"]: NotificationIcon,
            ["UserFollowings"]: FollowingIcon,
            ["UserFollowers"]: FollowersIcon,
            ["TopLanguages"]: TopIcon,
            ["Stats"]: StatsIcon,
            ["topLanguagesTooltip"]: TooltipIcon,
            ["autoUpdateEnabled"]: RefreshIcon,
        }[id] || GearsIcon;

    return (
        <div
            className={clsx(
                "flex justify-center items-center border rounded-md cursor-pointer w-12 h-12",
                {
                    "bg-dark-primary hover:bg-primary": enabled,
                    "bg-light hover:bg-light-primary": !enabled,
                },
            )}
            onClick={onClick}
            data-tooltip-id={id}
            data-tooltip-content={info}
        >
            <Icon
                className={clsx({
                    "text-dark fill-current": enabled,
                    "text-accent fill-current": !enabled,
                })}
            />
            <FeatureFlag name="enableWidgetTitleTooltip">
                <>
                    {info && (
                        <Tooltip className="!bg-gray-600 !w-[310px]" id={id} />
                    )}
                </>
            </FeatureFlag>
        </div>
    );
}
