import clsx from "clsx";
import { Tooltip } from "react-tooltip";
import { FeatureFlag } from "src/core";
import RequestIcon from "src/assets/request.svg?react";
import FollowingIcon from "src/assets/following.svg?react";
import StatsIcon from "src/assets/stats.svg?react";
import ApprovedIcon from "src/assets/approved.svg?react";
import GearsIcon from "src/assets/gears.svg?react";
import NotificationIcon from "src/assets/notification.svg?react";
import TopIcon from "src/assets/top.svg?react";
import FollowersIcon from "src/assets/followers.svg?react";
import TooltipIcon from "src/assets/tooltip.svg?react";
import RefreshIcon from "src/assets/refresh.svg?react";
import SettingsIcon from "src/assets/settings.svg?react";

export interface ISettingsTileProps {
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
    const SettingIcon =
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
            ["tileSettingsEnabled"]: SettingsIcon,
        }[id] || GearsIcon;

    return (
        <div
            className={clsx(
                "flex justify-center items-center border border-primary rounded-md cursor-pointer w-12 h-12",
                {
                    "bg-dark-primary hover:bg-primary": enabled,
                    "bg-light hover:bg-light-primary": !enabled,
                },
            )}
            onClick={onClick}
            data-tooltip-id={id}
            data-tooltip-content={info}
        >
            <SettingIcon
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
