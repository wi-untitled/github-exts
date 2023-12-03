import { FC, HTMLProps } from "react";

interface IWidgetHeaderLinkProps extends HTMLProps<HTMLAnchorElement> {}

export const WidgetHeaderLink: FC<IWidgetHeaderLinkProps> = ({
    children,
    href,
}) => {
    return (
        <a
            className="underline hover:no-underline text-blue-500"
            target="_blank"
            href={href}
        >
            {children}
        </a>
    );
};
