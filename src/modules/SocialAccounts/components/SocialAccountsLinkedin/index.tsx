import { makeLinkeinUrl } from "src/utils";
import LinkedinIcon from "src/assets/linkedin.svg?react";

export interface ISocialAccountsLinkedinProps {
    name: string;
}

export function SocialAccountsLinkedin({ name }: ISocialAccountsLinkedinProps) {
    return (
        <a href={makeLinkeinUrl(name)}>
            <LinkedinIcon />
        </a>
    );
}
