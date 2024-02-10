import { ReactNode } from "react";

export interface ISocialAccountsHrefProps {
    href: string;
    children: ReactNode;
}

export function SocialAccountsHref({
    href,
    children,
}: ISocialAccountsHrefProps) {
    return (
        <a href={href} className="pointer-events-none cursor-default">
            {children}
        </a>
    );
}
