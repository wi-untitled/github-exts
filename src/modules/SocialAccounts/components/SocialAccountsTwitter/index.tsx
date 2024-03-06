// TODO: make for twitter util fn
import { makeInstagramUrl } from "src/utils";
import { SocialAccountsHref } from "../SocialAccountsHref";
import { Icon } from "src/components";

export interface ISocialAccountsTwitterProps {
    name: string;
}

export function SocialAccountsTwitter({ name }: ISocialAccountsTwitterProps) {
    return (
        <SocialAccountsHref href={makeInstagramUrl(name)}>
            <Icon icon="twitter" />
        </SocialAccountsHref>
    );
}
