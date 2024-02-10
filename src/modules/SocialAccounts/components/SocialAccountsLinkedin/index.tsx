import { makeLinkeinUrl } from "src/utils";
import LinkedinIcon from "src/assets/linkedin.svg?react";
import { SocialAccountsHref } from "../SocialAccountsHref";

export interface ISocialAccountsLinkedinProps {
    name: string;
}

export function SocialAccountsLinkedin({ name }: ISocialAccountsLinkedinProps) {
    return (
        <SocialAccountsHref href={makeLinkeinUrl(name)}>
            <LinkedinIcon />
        </SocialAccountsHref>
    );
}
