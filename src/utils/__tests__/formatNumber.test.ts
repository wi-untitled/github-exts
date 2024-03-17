import { formatNumber } from "../formatNumber";

describe("formatNumber", () => {
    test("should format number with maximum two significant digits and compact notation", () => {
        const result = formatNumber(1234567890);
        expect(result).toBe("1.2B");
    });

    test("should format number with maximum two significant digits and compact notation for negative numbers", () => {
        const result = formatNumber(-987654321);
        expect(result).toBe("-990M");
    });

    test("should format number with maximum two significant digits and compact notation for decimals", () => {
        const result = formatNumber(12345.6789);
        expect(result).toBe("12K");
    });
});
