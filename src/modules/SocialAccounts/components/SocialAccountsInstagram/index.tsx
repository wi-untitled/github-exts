import { makeInstagramUrl } from "src/utils";
import InstagramIcon from "src/assets/instagram.svg?react";
import { SocialAccountsHref } from "../SocialAccountsHref";

export interface ISocialAccountsInstagramProps {
    name: string;
}

export function SocialAccountsInstagram({
    name,
}: ISocialAccountsInstagramProps) {
    return (
        <SocialAccountsHref href={makeInstagramUrl(name)}>
            <InstagramIcon />
        </SocialAccountsHref>
    );
}
