import { FC, PropsWithChildren } from "react";
import Spinner from "src/components/Spinner";

interface IWidgetProps {
    isLoading?: boolean;
    headerRight?: React.ReactNode;
    title: string;
}

export const Widget: FC<PropsWithChildren<IWidgetProps>> = ({
    children,
    isLoading = false,
    headerRight,
    title,
}) => {
    return (
        <div className="mb-3 border rounded-md border-gray-200 dark:border-gray-800 overflow-hidden">
            <header className="dark:bg-gray-900 bg-gray-100 px-3 py-2 flex space-x-0 justify-between border-b border-gray-200 dark:border-gray-800">
                <strong className="text-lg">{title}</strong>
                {headerRight}
            </header>
            <div className="relative">{isLoading ? <Spinner /> : children}</div>
        </div>
    );
};
