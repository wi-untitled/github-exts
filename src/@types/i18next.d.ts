// import en from "../i18n/en/translation.json";
import { defaultNS } from "src/i18n/config";
import resources from "src/@types/resources";

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS;
        resources: typeof resources;
        // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
        // set returnNull to false (and also in the i18next init options)
        // returnNull: false;
    }
}
