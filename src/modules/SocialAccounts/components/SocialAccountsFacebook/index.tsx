import { Url } from "src/utils";
import { SocialAccountsHref } from "../SocialAccountsHref";
import { Icon } from "src/components";

export interface ISocialAccountsFacebookProps {
    name: string;
}

export function SocialAccountsFacebook({ name }: ISocialAccountsFacebookProps) {
    return (
        <SocialAccountsHref href={Url.makeFacebookUrl(name)}>
            <Icon icon="facebook" />
        </SocialAccountsHref>
    );
}
