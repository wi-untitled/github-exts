export function formatNumber(value: number) {
    return new Intl.NumberFormat("en-en", {
        maximumSignificantDigits: 2,
        notation: "compact",
    }).format(value);
}
