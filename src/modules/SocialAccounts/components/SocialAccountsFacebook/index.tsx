import { makeInstagramUrl } from "src/utils";
import FacebookIcon from "src/assets/facebook.svg?react";

export interface ISocialAccountsFacebookProps {
    name: string;
}

export function SocialAccountsFacebook({ name }: ISocialAccountsFacebookProps) {
    return (
        <a href={makeInstagramUrl(name)}>
            <FacebookIcon />
        </a>
    );
}
