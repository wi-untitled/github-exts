// TODO: make for twitter util fn
import { makeInstagramUrl } from "src/utils";
import TwitterIcon from "src/assets/twitter.svg?react";
import { SocialAccountsHref } from "../SocialAccountsHref";

export interface ISocialAccountsTwitterProps {
    name: string;
}

export function SocialAccountsTwitter({ name }: ISocialAccountsTwitterProps) {
    return (
        <SocialAccountsHref href={makeInstagramUrl(name)}>
            <TwitterIcon />
        </SocialAccountsHref>
    );
}
