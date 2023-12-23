import { makeInstagramUrl } from "src/utils";
import { Icon } from "src/components";

export interface ISocialAccountsYoutubeProps {
    name: string;
}

export function SocialAccountsYoutube({ name }: ISocialAccountsYoutubeProps) {
    return (
        <a
            href={makeInstagramUrl(name)}
            className="block w-6 h-6 text-zinc-600 hover:rotate-90 transition duration-500 ease-in-out"
        >
            <Icon icon="facebook" />
        </a>
    );
}
