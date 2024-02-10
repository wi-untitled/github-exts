import { makeInstagramUrl } from "src/utils";
import YoutubeIcon from "src/assets/youtube.svg?react";

export interface ISocialAccountsYoutubeProps {
    name: string;
}

export function SocialAccountsYoutube({ name }: ISocialAccountsYoutubeProps) {
    return (
        <a href={makeInstagramUrl(name)}>
            <YoutubeIcon />
        </a>
    );
}
