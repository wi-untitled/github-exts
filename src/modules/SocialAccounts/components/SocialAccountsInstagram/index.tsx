import { makeInstagramUrl } from "src/utils";
import InstagramIcon from "src/assets/instagram.svg?react";

export interface ISocialAccountsInstagramProps {
    name: string;
}

export function SocialAccountsInstagram({
    name,
}: ISocialAccountsInstagramProps) {
    return (
        <a href={makeInstagramUrl(name)}>
            <InstagramIcon />
        </a>
    );
}
