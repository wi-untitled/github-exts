import { makeLinkeinUrl } from "src/utils";
import { Icon } from "src/components";

export interface ISocialAccountsLinkedinProps {
    name: string;
}

export function SocialAccountsLinkedin({ name }: ISocialAccountsLinkedinProps) {
    return (
        <a
            href={makeLinkeinUrl(name)}
            className="block w-6 h-6 text-zinc-600 hover:rotate-90 transition duration-500 ease-in-out"
        >
            <Icon icon="instagram" />
        </a>
    );
}
