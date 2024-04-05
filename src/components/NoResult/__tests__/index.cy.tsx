import { NoResult } from "../index";

describe("<NoResult />", () => {
    it("renders", () => {
        cy.mount(<NoResult message="No result" />);

        cy.matchImageSnapshot();
    });
});
