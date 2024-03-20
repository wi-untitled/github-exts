import { Url } from "src/utils";
import { SocialAccountsHref } from "../SocialAccountsHref";
import { Icon } from "src/components";

export interface ISocialAccountsInstagramProps {
    name: string;
}

export function SocialAccountsInstagram({
    name,
}: ISocialAccountsInstagramProps) {
    return (
        <SocialAccountsHref href={Url.makeInstagramUrl(name)}>
            <Icon icon="instagram" />
        </SocialAccountsHref>
    );
}
