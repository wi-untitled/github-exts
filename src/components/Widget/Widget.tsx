import { FC, PropsWithChildren } from "react";

interface IWidgetProps {
    headerRight?: React.ReactNode;
    title: string;
    minHeight?: string;
}

export const Widget: FC<PropsWithChildren<IWidgetProps>> = ({
    children,
    headerRight,
    title,
    minHeight,
}) => {
    return (
        <div
            className="mb-3 border rounded-md border-gray-200 dark:border-gray-800 overflow-hidden"
            style={{
                minHeight: minHeight,
            }}
        >
            <header className="dark:bg-gray-900 bg-gray-100 px-3 py-2 flex space-x-0 justify-between border-b border-gray-200 dark:border-gray-800">
                <strong className="text-lg">{title}</strong>
                {headerRight}
            </header>
            <div>{children}</div>
        </div>
    );
};
