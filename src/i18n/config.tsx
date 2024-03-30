import i18next, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "src/@types/resources";

export const defaultNS = "en";

i18next.use(initReactI18next).init(
    {
        lng: "en",
        debug: import.meta.env.MODE === "development",
        resources,
        defaultNS,
    } as InitOptions,
    () => {},
);
