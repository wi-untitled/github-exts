import { Link } from "../index";

describe("<Link />", () => {
    it("renders", () => {
        cy.mount(
            <Link href="test">
                <span>Text link</span>
            </Link>,
        );

        cy.matchImageSnapshot();
    });
});
