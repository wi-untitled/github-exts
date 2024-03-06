import { makeLinkeinUrl } from "src/utils";
import { SocialAccountsHref } from "../SocialAccountsHref";
import { Icon } from "src/components";

export interface ISocialAccountsLinkedinProps {
    name: string;
}

export function SocialAccountsLinkedin({ name }: ISocialAccountsLinkedinProps) {
    return (
        <SocialAccountsHref href={makeLinkeinUrl(name)}>
            <Icon icon="linkedin" />
        </SocialAccountsHref>
    );
}
