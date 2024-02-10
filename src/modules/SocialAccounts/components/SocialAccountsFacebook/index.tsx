import { makeFacebookUrl } from "src/utils";
import FacebookIcon from "src/assets/facebook.svg?react";
import { SocialAccountsHref } from "../SocialAccountsHref";

export interface ISocialAccountsFacebookProps {
    name: string;
}

export function SocialAccountsFacebook({ name }: ISocialAccountsFacebookProps) {
    return (
        <SocialAccountsHref href={makeFacebookUrl(name)}>
            <FacebookIcon />
        </SocialAccountsHref>
    );
}
