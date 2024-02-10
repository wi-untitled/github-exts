import React, { FC, PropsWithChildren } from "react";
import { Tooltip } from "react-tooltip";
import clsx from "clsx";
import Spinner from "src/components/Spinner";
import { FeatureFlag } from "src/core";

interface IWidgetProps {
    isLoading?: boolean;
    headerRight?: React.ReactNode;
    title: React.ReactNode;
    info?: string;
    id?: string;
    className?: string;
}

export const Widget: FC<PropsWithChildren<IWidgetProps>> = ({
    children,
    isLoading = false,
    headerRight,
    title,
    className,
}) => {
    return (
        <div
            className={clsx(
                "mb-3 border rounded-md border-light dark:border-dark overflow-hidden",
                className,
            )}
        >
            <header className="bg-light dark:bg-dark px-3 py-2 flex space-x-0 justify-between border-b border-light dark:border-dark">
                {typeof title === "string" ? (
                    <strong className="text-sm">{title}</strong>
                ) : (
                    title
                )}
                {headerRight}
            </header>
            <div className="relative bg-white dark:bg-[#0d1117]">
                {isLoading ? <Spinner /> : children}
            </div>
        </div>
    );
};
