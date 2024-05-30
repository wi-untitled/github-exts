import { HTMLProps } from "react";
import { Locale } from "src/utils";
interface ILinkProps extends HTMLProps<HTMLAnchorElement> {}

export function Link({ children, href }: ILinkProps) {
    console.log({ Locale: Locale });
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
