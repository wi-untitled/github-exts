import { Switch } from "../index";

describe("<Switch />", () => {
    it("renders enabled", () => {
        cy.mount(<Switch id="id" initValue={true} onChange={() => {}} />);

        cy.matchImageSnapshot();
    });

    it("renders disabled", () => {
        cy.mount(<Switch id="id" initValue={false} onChange={() => {}} />);

        cy.matchImageSnapshot();
    });
});
