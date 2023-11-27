export const HOST = "http://localhost:3000"; // TODO: need to be stored inside [.env]

export enum STORAGE_KEYS {
    CODE = "github-exts/CODE",
    ACCESS_TOKEN = "github-exts/ACCESS_TOKEN",
    TOKEN_TYPE = "github-exts/TOKEN_TYPE",
}

export const CLIENT_ID = "Iv1.1247dc257ee98cdd";
export const REDIRECT_URL =
    "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID;
