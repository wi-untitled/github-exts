import { makeYoutubeUrl } from "src/utils";
import { SocialAccountsHref } from "../SocialAccountsHref";
import { Icon } from "src/components";

export interface ISocialAccountsYoutubeProps {
    name: string;
}

export function SocialAccountsYoutube({ name }: ISocialAccountsYoutubeProps) {
    return (
        <SocialAccountsHref href={makeYoutubeUrl(name)}>
            <Icon icon="youtube" />
        </SocialAccountsHref>
    );
}
