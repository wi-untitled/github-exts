import { makeInstagramUrl } from "src/utils";
import TwitterIcon from "src/assets/twitter.svg?react";

export interface ISocialAccountsTwitterProps {
    name: string;
}

export function SocialAccountsTwitter({ name }: ISocialAccountsTwitterProps) {
    return (
        <a href={makeInstagramUrl(name)}>
            <TwitterIcon />
        </a>
    );
}
