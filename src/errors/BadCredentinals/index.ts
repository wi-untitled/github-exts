export class BadCredentinals extends Error {
    public code: number;

    public constructor(code: number = 666, message: string) {
        super(message);

        this.code = code;
    }
}
