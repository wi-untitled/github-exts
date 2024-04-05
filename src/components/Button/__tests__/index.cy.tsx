import { Button } from "../index";

describe("<Button />", () => {
    it("renders", () => {
        cy.mount(
            <Button onClick={() => {}} isDisabled={false} text="click me" />,
        );

        cy.matchImageSnapshot();
    });

    it("renders disabled button", () => {
        cy.mount(
            <Button onClick={() => {}} isDisabled={true} text="click me" />,
        );

        cy.matchImageSnapshot();
    });
});
