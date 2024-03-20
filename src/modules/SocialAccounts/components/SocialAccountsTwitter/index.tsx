// TODO: make for twitter util fn
import { Url } from "src/utils";
import { SocialAccountsHref } from "../SocialAccountsHref";
import { Icon } from "src/components";

export interface ISocialAccountsTwitterProps {
    name: string;
}

export function SocialAccountsTwitter({ name }: ISocialAccountsTwitterProps) {
    return (
        <SocialAccountsHref href={Url.makeInstagramUrl(name)}>
            <Icon icon="twitter" />
        </SocialAccountsHref>
    );
}
