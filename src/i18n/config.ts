// import i18next, { InitOptions } from "i18next";
// import { initReactI18next } from "react-i18next";
// import resources from "src/@types/resources";
//
// export const defaultNS = "en";
//
// i18next.use(initReactI18next).init(
//     {
//         lng: "en",
//         debug: import.meta.env.MODE === "development",
//         resources,
//         // defaultNS,
//     } as InitOptions,
//     () => {},
// );

import i18next, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import translation from "./en/translation.json";

i18next.use(initReactI18next).init(
    {
        lng: "en", // if you're using a language detector, do not define the lng option
        debug: true,
        resources: {
            en: {
                translation,
            },
        } as const,
        // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
        // set returnNull to false (and also in the i18next.d.ts options)
        // returnNull: false,
    } as InitOptions,
    () => {},
);
