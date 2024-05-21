import { test, expect } from "@playwright/experimental-ct-react";
import { Link } from "src/components";
import { Locale } from "src/utils";

test.use({ viewport: { width: 500, height: 500 } });

test("test", async ({ mount, page }) => {
    await mount(<Link href="http://localhost:3000">Linsdasdk</Link>);
    console.log({Locale, result: Locale.formatNumber(123)});
    await expect(page).toHaveScreenshot();
});

test("test 2", async ({ mount, page }) => {
    await mount(<Link href="http://localhost:3000">Lidfsadasddnk</Link>);

    await expect(page).toHaveScreenshot();
});
