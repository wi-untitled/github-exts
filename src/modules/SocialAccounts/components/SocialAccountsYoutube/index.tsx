import { makeYoutubeUrl } from "src/utils";
import YoutubeIcon from "src/assets/youtube.svg?react";
import { SocialAccountsHref } from "../SocialAccountsHref";

export interface ISocialAccountsYoutubeProps {
    name: string;
}

export function SocialAccountsYoutube({ name }: ISocialAccountsYoutubeProps) {
    return (
        <SocialAccountsHref href={makeYoutubeUrl(name)}>
            <YoutubeIcon />
        </SocialAccountsHref>
    );
}
