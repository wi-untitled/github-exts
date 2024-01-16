import { HTMLProps } from "react";

interface ILinkProps extends HTMLProps<HTMLAnchorElement> {}

export function Link({ children, href }: ILinkProps) {
    return (
        <a
            className="underline hover:no-underline text-blue-500"
            target="_blank"
            href={href}
        >
            {children}
        </a>
    );
}
