import { Url } from "src/utils";
import { SocialAccountsHref } from "../SocialAccountsHref";
import { Icon } from "src/components";

export interface ISocialAccountsLinkedinProps {
    name: string;
}

export function SocialAccountsLinkedin({ name }: ISocialAccountsLinkedinProps) {
    return (
        <SocialAccountsHref href={Url.makeLinkeinUrl(name)}>
            <Icon icon="linkedin" />
        </SocialAccountsHref>
    );
}
