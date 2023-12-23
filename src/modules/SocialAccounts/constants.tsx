import { ISocialAccountsProvider } from "src/types";
import {
    SocialAccountsFacebook,
    SocialAccountsInstagram,
    SocialAccountsLinkedin,
    SocialAccountsTwitter,
    SocialAccountsYoutube,
} from "./components";

export const iconRender = new Proxy(
    {
        [ISocialAccountsProvider.INSTAGRAM]: SocialAccountsInstagram,
        [ISocialAccountsProvider.TWITTER]: SocialAccountsTwitter,
        [ISocialAccountsProvider.YOUTUBE]: SocialAccountsYoutube,
        [ISocialAccountsProvider.FACEBOOK]: SocialAccountsFacebook,
        [ISocialAccountsProvider.LINKEDIN]: SocialAccountsLinkedin,
    },
    {
        get: (target, prop) => {
            return target[prop as keyof typeof ISocialAccountsProvider] ?? null;
        },
    },
);
