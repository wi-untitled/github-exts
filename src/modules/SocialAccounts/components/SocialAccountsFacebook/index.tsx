import { makeInstagramUrl } from "src/utils";
import { Icon } from "src/components";

export interface ISocialAccountsFacebookProps {
    name: string;
}

export function SocialAccountsFacebook({ name }: ISocialAccountsFacebookProps) {
    return (
        <a
            href={makeInstagramUrl(name)}
            className="block w-6 h-6 text-zinc-600 hover:rotate-90 transition duration-500 ease-in-out"
        >
            <Icon icon="facebook" />
        </a>
    );
}
